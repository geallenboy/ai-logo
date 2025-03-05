import { create } from "zustand";
import { Database } from "@datatypes.types";

interface UserState {
  loading: boolean;
  data: Database["public"]["Tables"]["ai_logo_users"]["Row"] | null;
  error: string | null;
  setData: (data: Database["public"]["Tables"]["ai_logo_users"]["Row"]) => void;
}

const userStore = create<UserState>((set) => ({
  loading: false,
  data: null,
  error: null,
  setData(data) {
    set({ data });
  },
}));

export default userStore;
