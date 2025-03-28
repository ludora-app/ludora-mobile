// A store for global application

import { create } from "zustand";

interface SampleState {
  sample: string;
}

interface SampleActions {
  setSample: (value: string) => void;
}

const defaultState: SampleState = {
  sample: "",
};

export const useSampleStore = create<SampleState & SampleActions>((set) => ({
  ...defaultState,
  setSample: (value) => set({ sample: value }),
}));
