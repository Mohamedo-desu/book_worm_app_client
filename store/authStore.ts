import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

// Define a generic User type. Update fields as needed.
interface User {
  [key: string]: any;
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
  user: null,
  token: null,
  isLoading: false,

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

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

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

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error: any) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user: User | null = userJson ? JSON.parse(userJson) : null;
      set({ user, token });
    } catch (error) {
      // Optionally handle error here
    }
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
