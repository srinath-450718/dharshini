/**
 * Admin API Service
 * Handles server-side authenticated operations for the private admin dashboard.
 * All requests use credentials: "include" to transmit the secure HTTP-only cookie.
 * No credentials or answers are stored in localStorage/sessionStorage.
 */

import { API_BASE_URL, getApiUrl } from "../config/api";

export interface AnswerItem {
  questionId: string;
  questionType: string;
  question: string;
  answer: string;
}

export interface SubmissionData {
  id: string;
  answers: AnswerItem[];
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface SessionResponse {
  authenticated: boolean;
}

export interface SubmissionsResponse {
  success: boolean;
  count: number;
  submissions: SubmissionData[];
  submission: SubmissionData | null;
  message?: string;
}

export const loginAdmin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const reqUrl = getApiUrl("/api/admin/login");
  console.log("[ADMIN API] Base URL:", API_BASE_URL);
  console.log("[ADMIN API] Request URL:", reqUrl);

  const response = await fetch(reqUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  });

  console.log("[ADMIN API] Response status:", response.status);
  const data = await response.json().catch(() => null);
  console.log("[ADMIN API] Response body:", data);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || "Invalid email or password.");
  }

  return data;
};

export const logoutAdmin = async (): Promise<LoginResponse> => {
  const reqUrl = getApiUrl("/api/admin/logout");
  console.log("[ADMIN API] Request URL:", reqUrl);

  const response = await fetch(reqUrl, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json().catch(() => null);
  return data || { success: true };
};

export const getAdminSession = async (): Promise<SessionResponse> => {
  const reqUrl = getApiUrl("/api/admin/session");
  console.log("[ADMIN API] Base URL:", API_BASE_URL);
  console.log("[ADMIN API] Request URL:", reqUrl);

  try {
    const response = await fetch(reqUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Cache-Control": "no-store",
      },
    });

    console.log("[ADMIN API] Response status:", response.status);
    const data = await response.json().catch(() => null);
    console.log("[ADMIN API] Response body:", data);

    if (!response.ok) {
      return { authenticated: false };
    }

    return { authenticated: Boolean(data?.authenticated) };
  } catch (err) {
    console.error("[ADMIN API] Error during getAdminSession:", err);
    return { authenticated: false };
  }
};

export const getSubmissions = async (): Promise<SubmissionsResponse> => {
  const reqUrl = getApiUrl("/api/admin/submissions");
  console.log("[ADMIN API] Base URL:", API_BASE_URL);
  console.log("[ADMIN API] Request URL:", reqUrl);

  try {
    const response = await fetch(reqUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Cache-Control": "no-store",
      },
    });

    console.log("[ADMIN API] Response status:", response.status);
    const data = await response.json().catch(() => null);
    console.log("[ADMIN API] Response body:", data);

    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    if (!response.ok || !data?.success) {
      throw new Error(data?.message || "Failed to retrieve submissions.");
    }

    return data;
  } catch (err) {
    console.error("[ADMIN API] Error during getSubmissions:", err);
    throw err;
  }
};
