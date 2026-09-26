import { create } from "zustand";

import { DropdownStore } from "./DropdownTypes";

const useDropdownStore = create<DropdownStore>((set, get) => ({
  left: undefined,
  top: undefined,
  show: (settings) => {
    set({
      ...settings,
    });
  },
  hide: (settings) => {
    const state = get();

    if (
      state.id !== undefined &&
      (settings?.id === undefined || settings.id === state.id)
    ) {
      set({
        id: undefined,
        trigger: undefined,
        renderContent: undefined,
        left: undefined,
        top: undefined,
      });
    }
  },
  setPosition: ({ id, ...position }) => {
    id === get().id && set({ ...position });
  },
}));

export default useDropdownStore;
