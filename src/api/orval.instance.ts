// src/api/mutator/custom-instance.ts
import { HTTPError, TimeoutError } from 'ky';

import { posthog } from '@/services/posthog.service';
import { ANALYTICS_EVENTS } from '@/constants/ANALYTICS_EVENTS';

import { kyApi } from './api.instance';

const SLOW_REQUEST_THRESHOLD = 2000;

export type ErrorResponse = {
  api_error?: {
    statusCode: number;
    message?: string | string[];
    error?: string;
  };
  api_error_detail?: string;
  api_error_status?: number | string;
  api_method: string;
  api_path: string;
  error_name: string;
  error_status?: number | string;
  error: HTTPError | TimeoutError;
  error_message: string;
};

export const customInstance = async <T>({
  data,
  headers,
  method,
  params,
  signal,
  url,
}: {
  url: string;
  method: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const client = kyApi;
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const startTime = performance.now();
  try {
    // Traiter les paramètres de requête URL s'ils existent
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: String(value) }), {}),
        ).toString()}`
      : '';

    // Construire les options de requête
    const requestOptions: Record<string, any> = {
      headers,
      signal: signal ?? undefined,
    };

    if (data instanceof FormData) {
      requestOptions.body = data;
    } else {
      requestOptions.json = data;
    }

    // Faire l'appel avec ky en fonction de la méthode
    const lowercaseMethod = method.toLowerCase();
    let response: Response;

    if (lowercaseMethod === 'get' || lowercaseMethod === 'delete') {
      response = await client.get(`${cleanUrl}${queryParams}`, requestOptions);
    } else if (lowercaseMethod === 'post') {
      response = await client.post(cleanUrl + queryParams, requestOptions);
    } else if (lowercaseMethod === 'put') {
      response = await client.put(cleanUrl + queryParams, requestOptions);
    } else {
      response = await client.patch(cleanUrl + queryParams, requestOptions);
    }

    const duration = performance.now() - startTime;

    if (duration > SLOW_REQUEST_THRESHOLD) {
      posthog.capture(ANALYTICS_EVENTS.API_SLOW_REQUEST, {
        api_duration_ms: Math.round(duration),
        api_method: method,
        api_path: url,
        url_params: params || {},
      });
    }
    if (response.status === 204) {
      return null as T;
    }
    return await response.json();
  } catch (error: any) {
    if (error instanceof TimeoutError) {
      const errorObj: ErrorResponse = {
        api_method: method,
        api_path: url,
        error,
        error_message: error.message,
        error_name: error?.name ?? 'TimeoutError',
      };
      throw errorObj;
    }

    if (error instanceof HTTPError) {
      const errorContent = (await error?.response?.json()) ?? {};

      const errorObj: ErrorResponse = {
        api_error: errorContent,
        api_error_detail: Array.isArray(errorContent?.message)
          ? errorContent.message[0]
          : (errorContent?.message ?? 'unknown'),
        api_error_status: errorContent?.statusCode ?? 'unknown',
        api_method: method,
        api_path: url,
        error,
        error_message: error.message,
        error_name: error?.name ?? 'HTTPError',
        error_status: error.response?.status ?? 'unknown',
      };

      throw errorObj;
    }
    throw error;
  }
};
