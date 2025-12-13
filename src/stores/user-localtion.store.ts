import { create } from 'zustand';
import { LocationObject } from 'expo-location';

interface UserLocationStore {
  location: LocationObject | null;
  setLocation: (location: LocationObject) => void;
}

const useUserLocationStore = create<UserLocationStore>(set => ({
  location: null,
  setLocation: location => set({ location }),
}));

export default useUserLocationStore;
