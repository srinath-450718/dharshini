/**
 * Centralized API configuration.
 * Reads VITE_API_BASE_URL from the environment.
 *
 * In local development, if VITE_API_BASE_URL is set (e.g. http://localhost:5000),
 * requests target that server directly. If empty, requests default to relative paths
 * which are proxied by Vite dev server.
 * In production, VITE_API_BASE_URL should point to the deployed backend domain.
 */
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://dharshini-3wby.onrender.com";

export const API_BASE_URL = typeof rawBaseUrl === "string" ? rawBaseUrl.replace(/\/+$/, "") : "https://dharshini-3wby.onrender.com";

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
};
