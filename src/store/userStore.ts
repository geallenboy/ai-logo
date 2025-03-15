import { AIUser } from "@/drizzle/schema";
import { create } from "zustand";

interface UserState {
  user: AIUser | null;
  isLoading: boolean;
  setUser: (user: AIUser | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
