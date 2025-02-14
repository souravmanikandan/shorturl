import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http:localhost:5000" : "/"

export const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    checkAuth: async () => {
		console.log("here")
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/auth/check-auth`, {withCredentials: true});
            console.log('response', response);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            console.error('Auth Error:', error);
            set({ error: error.message, isCheckingAuth: false, isAuthenticated: false });
        }
    },
}));
