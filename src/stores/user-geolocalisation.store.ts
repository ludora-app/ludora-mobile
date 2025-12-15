import { create } from 'zustand';
import { LocationObject } from 'expo-location';

interface UserLocationStore {
  location: { latitude: LocationObject['coords']['latitude']; longitude: LocationObject['coords']['longitude'] } | null;
  setLocation: (location: {
    latitude: LocationObject['coords']['latitude'];
    longitude: LocationObject['coords']['longitude'];
  }) => void;
}

export const useUserLocationStore = create<UserLocationStore>(set => ({
  location: null,
  setLocation: location => set({ location }),
}));
