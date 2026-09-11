import React, { useState, useEffect } from "react";
import { LogOut, Calendar, CheckCircle2, RefreshCw, AlertCircle, Inbox } from "lucide-react";
import { getSubmissions, logoutAdmin, type SubmissionData } from "../../services/adminApi";

export interface AdminDashboardProps {
  onLogout: () => void;
  onSessionExpired: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onSessionExpired,
}) => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnswers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getSubmissions();
      setSubmissions(data.submissions || []);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        setSubmissions([]);
        onSessionExpired();
        return;
      }
      setError(
        err instanceof Error ? err.message : "Failed to load responses from the server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch {
      // Ignore network errors on logout
    }
    onLogout();
  };

  const formatSubmissionDate = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080D25] text-[#FFF7F0] p-4 sm:p-8 md:p-12 selection:bg-[#F05AA6]/30 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* ==========================================
            15. DASHBOARD HEADER
           ========================================== */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F5C84B] font-medium block">
              PRIVATE RESPONSES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FFF7F0] font-normal tracking-tight pt-1">
              Seven Questions
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#AEB6CC] pt-1">
              Only you can see these answers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh button */}
            <button
              onClick={fetchAnswers}
              disabled={isLoading}
              title="Refresh submissions"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#AEB6CC] hover:text-[#FFF7F0] transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              id="btn-admin-logout"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono tracking-wider text-red-300 hover:text-red-200 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>LOG OUT</span>
            </button>
          </div>
        </header>

        {/* Error notification */}
        {error && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm font-mono text-red-300 flex items-center gap-3"
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ==========================================
            31. LOADING STATE
           ========================================== */}
        {isLoading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#F5C84B] border-t-transparent animate-spin mx-auto shadow-[0_0_15px_rgba(245,200,75,0.3)]" />
            <p className="font-mono text-xs text-[#AEB6CC] tracking-widest uppercase">
              Loading responses...
            </p>
          </div>
        )}

        {/* ==========================================
            32. EMPTY STATE
           ========================================== */}
        {!isLoading && submissions.length === 0 && !error && (
          <div className="py-24 text-center space-y-4 rounded-3xl bg-[#0D1330]/60 border border-white/10 p-8 sm:p-12">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#AEB6CC]/40 mx-auto">
              <Inbox size={28} />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl text-[#FFF7F0]">Nothing here yet.</h2>
              <p className="font-sans text-sm text-[#AEB6CC] max-w-md mx-auto">
                When the seven answers are submitted, they'll appear here.
              </p>
            </div>
          </div>
        )}

        {/* ==========================================
            SUBMISSIONS LIST & ELEGANT ANSWER SECTIONS
           ========================================== */}
        {!isLoading && submissions.length > 0 && (
          <div className="space-y-16">
            {submissions.map((sub, sIdx) => {
              const formattedDate = formatSubmissionDate(sub.createdAt);
              const isMultiple = submissions.length > 1;

              return (
                <div key={sub.id} className="space-y-8">
                  {/* ==========================================
                      14 & 45. SUBMISSION SUMMARY CARD
                     ========================================== */}
                  <div className="rounded-3xl bg-[#0D1330]/95 border border-[#F5C84B]/20 p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.6)] space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#080D25] border border-[#F5C84B]/40 flex items-center justify-center text-[#F5C84B] shadow-[0_0_15px_rgba(245,200,75,0.2)]">
                          <CheckCircle2 size={22} />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#F5C84B] font-semibold block">
                            {isMultiple ? `SUBMISSION #${submissions.length - sIdx}` : "SUBMISSION STATUS"}
                          </span>
                          <span className="font-sans text-base sm:text-lg font-medium text-[#FFF7F0]">
                            COMPLETED
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-left sm:text-right">
                        <div>
                          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#AEB6CC]/70 block">
                            ANSWERS
                          </span>
                          <span className="font-mono text-sm font-semibold text-[#FFF7F0]">
                            {sub.answers.length} / 7
                          </span>
                        </div>

                        <div>
                          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#AEB6CC]/70 block">
                            SUBMITTED
                          </span>
                          <div className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#AEB6CC]">
                            <Calendar size={13} className="text-[#F5C84B]" />
                            <span>{formattedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#AEB6CC]/60 pt-1">
                      <span>THE ANSWERS</span>
                      <span>PRIVATE VIEW ONLY</span>
                    </div>
                  </div>

                  {/* ==========================================
                      18-24. THE 7 ANSWERS DISPLAY
                     ========================================== */}
                  <div className="space-y-8">
                    {sub.answers.map((ans, qIdx) => {
                      const qNumber = String(qIdx + 1).padStart(2, "0");
                      const isMCQ = ans.questionType === "mcq";
                      const isFocalPoint = ans.questionId === "q7";

                      if (isFocalPoint) {
                        {/* ==========================================
                            24. QUESTION 7 DISPLAY (Focal Point)
                           ========================================== */}
                        return (
                          <section
                            key={ans.questionId}
                            className="relative rounded-3xl bg-gradient-to-b from-[#11183c] to-[#0D1330] border-2 border-[#F5C84B]/50 p-6 sm:p-10 shadow-[0_20px_60px_rgba(245,200,75,0.15)] space-y-6"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#F5C84B] font-bold">
                                QUESTION {qNumber}
                              </span>
                              <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#F5C84B]/15 text-[#F5C84B] border border-[#F5C84B]/30 font-medium">
                                EMOTIONAL FOCAL POINT
                              </span>
                            </div>

                            {/* Question prompt in larger calm typography */}
                            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#FFF7F0] font-normal leading-relaxed">
                              &ldquo;{ans.question}&rdquo;
                            </h3>

                            <div className="pt-4 space-y-3">
                              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F5C84B] font-semibold block">
                                HER ANSWER
                              </span>
                              <div className="p-6 sm:p-8 rounded-2xl bg-[#080D25]/95 border border-[#F5C84B]/30 shadow-inner">
                                <p className="font-sans text-base sm:text-lg lg:text-xl text-[#FFF7F0] leading-relaxed whitespace-pre-wrap break-words font-light">
                                  {ans.answer}
                                </p>
                              </div>
                            </div>
                          </section>
                        );
                      }

                      {/* Standard Questions (Q1 - Q6) */}
                      return (
                        <section
                          key={ans.questionId}
                          className="rounded-3xl bg-[#0D1330]/90 border border-white/10 p-6 sm:p-8 shadow-lg space-y-5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#F5C84B] font-semibold">
                              QUESTION {qNumber}
                            </span>
                            <span className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#AEB6CC]">
                              {isMCQ ? "MULTIPLE CHOICE" : "OPEN WRITTEN ANSWER"}
                            </span>
                          </div>

                          {/* Question Text */}
                          <h3 className="font-serif text-lg sm:text-xl text-[#FFF7F0] font-normal leading-snug">
                            {ans.question}
                          </h3>

                          {/* Answer Box */}
                          <div className="pt-2 space-y-2">
                            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#F05AA6] font-semibold block">
                              HER ANSWER
                            </span>
                            <div className="p-5 sm:p-6 rounded-2xl bg-[#080D25]/90 border border-white/10">
                              <p className="font-sans text-sm sm:text-base text-[#FFF7F0] leading-relaxed whitespace-pre-wrap break-words">
                                {isMCQ ? `"${ans.answer}"` : ans.answer}
                              </p>
                            </div>
                          </div>
                        </section>
                      );
                    })}
                  </div>

                  {/* Horizontal separator between multiple submissions if any */}
                  {isMultiple && sIdx < submissions.length - 1 && (
                    <div className="pt-8 pb-4">
                      <div className="border-t border-white/10" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
