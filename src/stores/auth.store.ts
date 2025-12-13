import { create } from 'zustand';

interface AuthStoreState {
  isLoading: boolean;
  isAuthenticated: boolean;

  setIsLoading: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStoreState>(set => ({
  ...initialState,

  setIsAuthenticated: value => set(state => (state.isAuthenticated === value ? state : { isAuthenticated: value })),
  setIsLoading: value => set(state => (state.isLoading === value ? state : { isLoading: value })),
}));
