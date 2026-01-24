import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

let sessionPromise: Promise<any> | null = null;

axiosInstance.interceptors.request.use(async (config) => {
    if (!sessionPromise) {
        sessionPromise = getSession();
        setTimeout(() => { sessionPromise = null; }, 10000); // Memoize for 10s
    }

    const session = await sessionPromise;
    if (session?.error === "RefreshAccessTokenError") {
        if (typeof window !== "undefined") {
            window.location.href = "/logout";
        }
    }
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: any) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized API call detected (401)");
            // Do not redirect here to avoid infinite loops on background fetches (like Cart)
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
