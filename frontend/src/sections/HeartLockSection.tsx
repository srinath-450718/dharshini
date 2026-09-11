import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { HeartLock } from "../components/HeartLock";
import { LuckyCharmIcon } from "../components/LuckyCharmIcon";
import { useHeartLock } from "../hooks/useHeartLock";
import { cn } from "../utils/cn";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";

interface HeartLockSectionProps {
  onUnlockComplete?: () => void;
}

export const HeartLockSection: React.FC<HeartLockSectionProps> = ({
  onUnlockComplete,
}) => {
  const [revealedMessageStep, setRevealedMessageStep] = useState<number>(0);
  const [showLuckyCharm, setShowLuckyCharm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const {
    password,
    setPassword,
    lockState,
    errorMessage,
    attempts,
    unlockStage,
    checkPassword,
    handleKeyDown,
  } = useHeartLock(() => {
    // When unlock state transitions to stage 5
    // Sequential reveal of messages:
    // Message 1: "Of course you knew. 😌"
    setRevealedMessageStep(1);

    setTimeout(() => {
      // Message 2: "Welcome, Dharshini."
      setRevealedMessageStep(2);
      setShowLuckyCharm(true);
    }, 700);

    setTimeout(() => {
      // Message 3: "Your surprise starts here."
      setRevealedMessageStep(3);
    }, 1400);

    setTimeout(() => {
      if (onUnlockComplete) {
        onUnlockComplete();
      }
    }, 2200);
  });

  // Shake input on error
  useEffect(() => {
    if (lockState === "error" && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { x: -8 },
        {
          x: 8,
          duration: 0.08,
          repeat: 4,
          yoyo: true,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(formRef.current, { x: 0, duration: 0.1 });
          },
        }
      );
    }
  }, [lockState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockState !== "unlocking" && lockState !== "unlocked") {
      checkPassword();
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 z-20 overflow-hidden select-none">
      {/* Background Starfield Brightness Flare on Unlock (Step 12) */}
      <div
        className={cn(
          "fixed inset-0 pointer-events-none transition-all duration-1000 -z-10",
          unlockStage >= 3
            ? "bg-radial from-[#F5C84B]/10 via-[#F05AA6]/10 to-transparent opacity-100"
            : "opacity-0"
        )}
      />

      <div className="w-full max-w-md mx-auto flex flex-col items-center text-center space-y-8">
        {/* TEXT ABOVE THE HEART */}
        <div className="space-y-1 transition-all duration-700">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FFF7F0] font-normal tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            A heart locked for one person.
          </h1>
        </div>

        {/* CENTER HEART LOCK COMPONENT */}
        <div className="relative py-2 flex items-center justify-center">
          <HeartLock
            state={lockState}
            unlockStage={unlockStage}
            attempts={attempts}
          />
        </div>

        {/* INTERACTIVE CONTROLS / UNLOCK SEQUENCE */}
        {lockState !== "unlocked" && unlockStage < 4 ? (
          <div className="w-full max-w-xs space-y-6">
            {/* TEXT BELOW THE HEART */}
            <div className="space-y-1">
              <p className="font-sans text-sm sm:text-base text-[#AEB6CC] font-light">
                What is your secret password or special date?
              </p>
              <p className="font-sans text-xs text-[#AEB6CC]/70 italic">
                Enter password (e.g. LuckyCharm or DDMMYYYY)
              </p>
            </div>

            {/* PASSWORD INPUT FORM */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-3 pt-2"
            >
              <div className="relative group">
                <label htmlFor="heart-lock-password" className="sr-only">
                  Password to unlock
                </label>
                <input
                  id="heart-lock-password"
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="LuckyCharm or 11092007..."
                  disabled={lockState === "unlocking"}
                  autoComplete="off"
                  className={cn(
                    "w-full pl-5 pr-12 py-3.5 rounded-full bg-[#0D1330]/80 backdrop-blur-xl text-[#FFF7F0] placeholder-[#AEB6CC]/50 text-sm font-sans tracking-wide outline-none border transition-all duration-300 shadow-xl shadow-black/40",
                    lockState === "unlocking"
                      ? "border-[#E88AAA] shadow-[0_0_20px_rgba(232,138,170,0.35)] bg-[#151A3A]"
                      : lockState === "error"
                      ? "border-[#E88AAA]/70 shadow-[0_0_15px_rgba(232,138,170,0.25)]"
                      : "border-white/10 hover:border-[#E88AAA]/40 focus:border-[#E88AAA] focus:shadow-[0_0_20px_rgba(232,138,170,0.25)]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AEB6CC]/50 hover:text-[#E88AAA] transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* UNLOCK BUTTON */}
              <button
                type="submit"
                disabled={lockState === "unlocking" || !password.trim()}
                className={cn(
                  "w-full py-3.5 px-6 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer select-none flex items-center justify-center gap-2",
                  lockState === "unlocking"
                    ? "bg-[#E88AAA] text-[#080D25] shadow-lg shadow-[#E88AAA]/30 scale-[0.99]"
                    : "bg-gradient-to-r from-[#E88AAA] to-[#D97898] hover:from-[#f09ab5] hover:to-[#e483a2] text-[#080D25] font-semibold shadow-lg shadow-[#E88AAA]/20 hover:shadow-[#E88AAA]/35 hover:scale-[1.01] active:scale-[0.98] border border-white/10 disabled:opacity-50 disabled:pointer-events-none"
                )}
              >
                {lockState === "unlocking" ? (
                  <>
                    <Sparkles size={16} className="text-[#F5C84B] animate-spin" />
                    <span>Unlocked</span>
                  </>
                ) : (
                  <span>Unlock</span>
                )}
              </button>
            </form>

            {/* PLAYFUL ERROR MESSAGE */}
            {errorMessage && lockState === "error" && (
              <div className="p-2.5 rounded-xl bg-[#0D1330]/90 border border-[#E88AAA]/30 text-xs text-[#FFF7F0] font-sans animate-fadeIn shadow-lg shadow-black/30 flex items-center justify-center gap-2">
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        ) : (
          /* UNLOCKED SUCCESS REVEAL MESSAGES */
          <div
            ref={messageBoxRef}
            className="w-full max-w-sm space-y-4 pt-4 text-center transition-all duration-700"
          >
            {/* Sequential Messages */}
            <div className="space-y-3 min-h-[90px] flex flex-col items-center justify-center">
              {revealedMessageStep >= 1 && (
                <p className="font-serif text-2xl sm:text-3xl text-[#FFF7F0] tracking-tight transition-all duration-700 animate-fadeIn">
                  Of course you knew. 😌
                </p>
              )}

              {revealedMessageStep >= 2 && (
                <div className="space-y-2 animate-fadeIn transition-all duration-700">
                  <p className="font-serif text-xl sm:text-2xl text-[#F5C84B] tracking-wide">
                    Welcome, Dharshini.
                  </p>

                  {/* Lucky Charm Motif (Briefly shows and glows) */}
                  {showLuckyCharm && (
                    <div className="py-2 flex items-center justify-center gap-2 text-[#F5C84B] animate-pulse">
                      <span className="text-xs">✦</span>
                      <LuckyCharmIcon size={26} glow />
                      <span className="text-xs">✦</span>
                    </div>
                  )}
                </div>
              )}

              {revealedMessageStep >= 3 && (
                <p className="font-sans text-sm text-[#AEB6CC] tracking-widest uppercase font-light animate-fadeIn transition-all duration-700">
                  Your surprise starts here.
                </p>
              )}
            </div>

            {/* Quick Enter Button */}
            {revealedMessageStep >= 1 && (
              <div className="pt-2 animate-fadeIn flex justify-center">
                <button
                  type="button"
                  onClick={() => onUnlockComplete && onUnlockComplete()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E88AAA]/20 hover:bg-[#E88AAA]/35 border border-[#E88AAA]/50 text-[#FFF7F0] text-xs font-sans font-medium tracking-wide shadow-lg shadow-[#E88AAA]/10 transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Enter Surprise</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}

            {/* Ambient Loading indicator for smooth transition */}
            {revealedMessageStep >= 3 && (
              <div className="pt-1 flex justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F05AA6] animate-ping" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
