import React, { useState } from "react";
import { Eye, EyeOff, Lock, AlertCircle, Loader2 } from "lucide-react";
import { loginAdmin, getAdminSession } from "../../services/adminApi";

export interface AdminLoginProps {
  onLoginSuccess: () => void;
  initialError?: string | null;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  initialError = null,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isChecking) return;

    const trimmedEmail = email.trim();

    // Basic format check on client before making network call
    if (!trimmedEmail || !password) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    // RFC-like lightweight email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    setIsChecking(true);
    setErrorMessage(null);

    try {
      await loginAdmin(trimmedEmail, password);
      // Requirement 5: Call GET /api/admin/session with credentials: "include"
      await getAdminSession();
      // Success: proceed to dashboard
      onLoginSuccess();
    } catch {
      // Strictly generic error message to prevent user enumeration
      setErrorMessage("Invalid email or password.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-[#080D25] to-[#0D1330] text-[#FFF7F0] select-none font-sans">
      <div className="relative w-full max-w-[420px] p-8 sm:p-10 rounded-3xl bg-[#0D1330]/95 border border-[#F5C84B]/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
        {/* Subtle decorative background glow (no hearts/bunnies) */}
        <div className="absolute inset-0 rounded-3xl bg-radial from-[#F05AA6]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Header section */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#080D25] border border-[#F5C84B]/30 text-[#F5C84B] shadow-[0_0_20px_rgba(245,200,75,0.2)] mx-auto">
              <Lock size={20} className="stroke-[1.8]" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F5C84B] font-semibold block">
                PRIVATE ACCESS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#FFF7F0] font-normal tracking-tight">
                Welcome Back
              </h1>
              <p className="font-sans text-sm text-[#AEB6CC] pt-0.5">
                Some answers are waiting for you.
              </p>
            </div>
          </div>

          {/* Generic Error Alert */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300 animate-fadeIn"
            >
              <AlertCircle size={16} className="flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-email"
                className="block font-mono text-xs tracking-wider uppercase text-[#AEB6CC]"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  disabled={isChecking}
                  className="w-full px-4 py-3 rounded-xl bg-[#080D25]/80 border border-white/15 text-sm text-[#FFF7F0] placeholder-[#AEB6CC]/40 focus:outline-none focus:border-[#F5C84B] focus:ring-2 focus:ring-[#F5C84B]/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-password"
                className="block font-mono text-xs tracking-wider uppercase text-[#AEB6CC]"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={isChecking}
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#080D25]/80 border border-white/15 text-sm text-[#FFF7F0] placeholder-[#AEB6CC]/40 focus:outline-none focus:border-[#F5C84B] focus:ring-2 focus:ring-[#F5C84B]/20 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 p-1.5 text-[#AEB6CC] hover:text-[#FFF7F0] transition-colors cursor-pointer rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F5C84B]"
                >
                  {showPassword ? (
                    <EyeOff size={16} className="opacity-70" />
                  ) : (
                    <Eye size={16} className="opacity-70" />
                  )}
                </button>
              </div>
            </div>

            {/* Enter Dashboard Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-admin-login"
                disabled={isChecking}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F5C84B] via-[#F05AA6] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.3)] hover:shadow-[0_0_30px_rgba(240,90,166,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isChecking ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#080D25]" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <span>ENTER DASHBOARD</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
