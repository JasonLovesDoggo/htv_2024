import { create } from "zustand";

interface ServerUrlState {
  serverUrl: string;
  setServerUrl: (serverUrl: string) => void;
}

const useServerUrl = create<ServerUrlState>((set) => ({
  serverUrl: "",
  setServerUrl: (serverUrl: string) => set({ serverUrl }),
}));

export { useServerUrl };
