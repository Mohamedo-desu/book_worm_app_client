import { API_URL } from "@/constants/api";
import { create } from "zustand";
import { deleteStoredValues, getStoredValues, saveSecurely } from "./storage";

// Define a generic User type. Update fields as needed.
interface User {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: string;
}

// Define the shape of the response returned by auth methods.
interface AuthResponse {
  success: boolean;
  error?: string;
}

// Define the store interface.
interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {} as User,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      saveSecurely([{ key: "userJson", value: JSON.stringify(data.user) }]);
      saveSecurely([{ key: "token", value: data.token }]);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      saveSecurely([{ key: "userJson", value: JSON.stringify(data.user) }]);
      saveSecurely([{ key: "token", value: data.token }]);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async (): Promise<void> => {
    try {
      const { token } = getStoredValues(["token"]);
      const { userJson } = getStoredValues(["userJson"]);

      const user: User | null = userJson ? JSON.parse(userJson) : null;
      set({ user, token });
    } catch (error) {
      // Optionally handle error here
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async (): Promise<void> => {
    deleteStoredValues(["token"]);
    deleteStoredValues(["userJson"]);

    set({ user: null, token: null });
  },
}));
