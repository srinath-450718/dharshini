import React, { useState, useEffect } from "react";
import { App } from "../../App";
import { AdminLogin } from "../Admin/AdminLogin";
import { AdminDashboard } from "../Admin/AdminDashboard";
import { getAdminSession } from "../../services/adminApi";

export const AppRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [sessionExpiredMsg, setSessionExpiredMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const checkSession = async () => {
    try {
      const res = await getAdminSession();
      setIsAdminAuthenticated(res.authenticated);
    } catch {
      setIsAdminAuthenticated(false);
    }
  };

  // Check admin session whenever visiting /admin or /admin/dashboard
  useEffect(() => {
    if (currentPath.startsWith("/admin")) {
      checkSession();
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const handleSessionExpired = () => {
    setIsAdminAuthenticated(false);
    setSessionExpiredMsg("Your session has expired. Please sign in again.");
    navigate("/admin");
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setSessionExpiredMsg(null);
    navigate("/admin");
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setSessionExpiredMsg(null);
    navigate("/admin/dashboard");
  };

  const normalizedPath = currentPath.replace(/\/+$/, "") || "/";

  // Route 1: /admin/dashboard
  if (normalizedPath === "/admin/dashboard") {
    // If still verifying session on initial load
    if (isAdminAuthenticated === null) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#080D25] text-[#AEB6CC]">
          <div className="w-8 h-8 rounded-full border-2 border-[#F5C84B] border-t-transparent animate-spin" />
        </div>
      );
    }

    if (isAdminAuthenticated === false) {
      // Unauthenticated -> redirect to /admin
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          initialError={sessionExpiredMsg}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={handleLogout}
        onSessionExpired={handleSessionExpired}
      />
    );
  }

  // Route 2: /admin
  if (normalizedPath === "/admin") {
    // If already authenticated, redirect straight to dashboard
    if (isAdminAuthenticated === true) {
      return (
        <AdminDashboard
          onLogout={handleLogout}
          onSessionExpired={handleSessionExpired}
        />
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        initialError={sessionExpiredMsg}
      />
    );
  }

  // Default Route: Public Birthday Website (completely separate, no admin elements)
  return <App />;
};
