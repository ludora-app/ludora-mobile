/**
 * Safety net for the shared ky HTTP client (`kyApi`).
 *
 * These tests freeze the *observable behaviour* of the client so the ky 1 -> 2
 * upgrade can be proven non-regressive:
 *   1. the Authorization header is injected from SecureStore before each request;
 *   2. a 401 transparently refreshes the token and replays the original request;
 *   3. a 401 without a stored refresh token logs the user out.
 *
 * Written BEFORE the upgrade — the exact same assertions must keep passing after.
 */

const mockGetItem = jest.fn<Promise<string | null>, [string]>();
const mockSetItem = jest.fn();
const mockDeleteItem = jest.fn();

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: (key: string) => mockDeleteItem(key),
  getItemAsync: (key: string) => mockGetItem(key),
  setItemAsync: (key: string, value: string) => mockSetItem(key, value),
}));

const mockSetIsAuthenticated = jest.fn();
jest.mock('@/stores/auth.store', () => ({
  useAuthStore: { getState: () => ({ setIsAuthenticated: mockSetIsAuthenticated }) },
}));

const mockIncrementTokenVersion = jest.fn();
jest.mock('@/stores/websocket.store', () => ({
  useWebsocketStore: { getState: () => ({ incrementTokenVersion: mockIncrementTokenVersion }) },
}));

jest.mock('@/utils/api-url.utils', () => ({
  getApiUrl: () => 'https://api.test',
}));

const mockRefreshPost = jest.fn();
jest.mock('./queries/refresh-token.query', () => ({
  POST: (refreshToken: string) => mockRefreshPost(refreshToken),
}));

// eslint-disable-next-line import/first
import { kyApi } from './api.instance';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    status,
  });

describe('kyApi (shared HTTP client) — behavioural safety net', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('injects the access token as a Bearer Authorization header', async () => {
    mockGetItem.mockResolvedValue('access-123');
    (global.fetch as jest.Mock).mockResolvedValue(jsonResponse({ ok: true }));

    await kyApi.get('ping');

    const request = (global.fetch as jest.Mock).mock.calls[0][0] as Request;
    expect(request.headers.get('Authorization')).toBe('Bearer access-123');
    expect(request.url).toBe('https://api.test/ping');
  });

  it('does not set an Authorization header when no token is stored', async () => {
    mockGetItem.mockResolvedValue(null);
    (global.fetch as jest.Mock).mockResolvedValue(jsonResponse({ ok: true }));

    await kyApi.get('ping');

    const request = (global.fetch as jest.Mock).mock.calls[0][0] as Request;
    expect(request.headers.get('Authorization')).toBeNull();
  });

  it('refreshes the token and replays the request on a 401', async () => {
    mockGetItem.mockImplementation(async (key: string) => {
      if (key === 'access_token') return 'old-access';
      if (key === 'refresh_token') return 'refresh-xyz';
      return null;
    });
    mockRefreshPost.mockResolvedValue({
      data: { accessToken: 'new-access', refreshToken: 'new-refresh' },
    });

    let call = 0;
    (global.fetch as jest.Mock).mockImplementation(async () => {
      call += 1;
      return call === 1 ? new Response('', { status: 401 }) : jsonResponse({ ok: true });
    });

    const response = await kyApi.get('secure');

    expect(mockRefreshPost).toHaveBeenCalledWith('refresh-xyz');
    expect(mockSetItem).toHaveBeenCalledWith('access_token', 'new-access');
    expect(mockSetItem).toHaveBeenCalledWith('refresh_token', 'new-refresh');
    expect(mockIncrementTokenVersion).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);

    const replayedRequest = (global.fetch as jest.Mock).mock.calls[1][0] as Request;
    expect(replayedRequest.headers.get('Authorization')).toBe('Bearer new-access');
  });

  it('logs the user out on a 401 when no refresh token is available', async () => {
    mockGetItem.mockImplementation(async (key: string) => {
      if (key === 'access_token') return 'old-access';
      return null;
    });
    (global.fetch as jest.Mock).mockResolvedValue(new Response('', { status: 401 }));

    await expect(kyApi.get('secure')).rejects.toBeDefined();

    expect(mockRefreshPost).not.toHaveBeenCalled();
    expect(mockDeleteItem).toHaveBeenCalledWith('access_token');
    expect(mockDeleteItem).toHaveBeenCalledWith('refresh_token');
    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false);
  });
});
