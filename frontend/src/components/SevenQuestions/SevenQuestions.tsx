import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { personalQuestions } from "../../data/personalQuestions";
import { QuestionProgress } from "./QuestionProgress";
import { MCQQuestion } from "./MCQQuestion";
import { TextQuestion } from "./TextQuestion";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { getApiUrl } from "../../config/api";

export interface SevenQuestionsProps {
  onUnlockNext?: () => void;
}

export const SevenQuestions: React.FC<SevenQuestionsProps> = ({ onUnlockNext }) => {
  // Authoritative question index: strictly 0 to 6
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  // Stable answers storage for all 7 questions
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Smooth entrance animation on question change
  useEffect(() => {
    if (!cardRef.current || isSubmitted) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16, scale: 0.99 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }, [currentQuestion, isSubmitted]);

  // Debug log on active question change
  useEffect(() => {
    if (!isSubmitted) {
      console.log(`[QUESTIONS] Current question: ${currentQuestion + 1} / 7`);
    }
  }, [currentQuestion, isSubmitted]);

  const handleAnswerChange = (questionId: string, val: string) => {
    console.log(`[QUESTIONS] Answer updated: ${questionId}`);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: val,
    }));
    if (validationError) setValidationError(null);
  };

  const handleBack = () => {
    if (currentQuestion <= 0) return; // Cannot go before Q1
    setValidationError(null);
    setSubmitError(null);
    console.log(`[QUESTIONS] Moving: q${currentQuestion + 1} -> q${currentQuestion}`);
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const currentQ = personalQuestions[currentQuestion];
    const currentAnswer = (answers[currentQ.id] || "").trim();

    if (!currentAnswer) {
      if (currentQ.type === "mcq") {
        setValidationError("Please select an option before continuing. 😌");
      } else {
        setValidationError("Tell me something. Don't escape this one 😌");
      }
      return;
    }

    setValidationError(null);
    setSubmitError(null);

    if (currentQuestion < 6) {
      console.log(`[QUESTIONS] Moving: q${currentQuestion + 1} -> q${currentQuestion + 2}`);
      setCurrentQuestion((prev) => Math.min(6, prev + 1));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const currentQ7Answer = (answers.q7 || "").trim();

    if (!currentQ7Answer) {
      setValidationError("Take your time. Say what you really feel... Don't escape this one 😌");
      return;
    }

    // Construct final submission object explicitly to prevent any React async stale-state issues
    const finalAnswers: Record<string, string> = {
      ...answers,
      q7: currentQ7Answer,
    };

    // Validate ALL 7 answers thoroughly before network request
    const missingKeys: string[] = [];
    for (const q of personalQuestions) {
      if (!(finalAnswers[q.id] || "").trim()) {
        missingKeys.push(q.id.toUpperCase());
      }
    }

    if (missingKeys.length > 0) {
      setSubmitError(`Please complete all questions before submitting: missing ${missingKeys.join(", ")}.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setValidationError(null);

    const formattedAnswers = personalQuestions.map((q) => ({
      questionId: q.id,
      questionType: q.type,
      question: q.question,
      answer: (finalAnswers[q.id] || "").trim(),
    }));

    console.log("[QUESTIONS] Submitting all 7 answers to backend...");

    try {
      const response = await fetch(getApiUrl("/api/submissions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          answers: formattedAnswers,
          answerMap: finalAnswers,
          q1: finalAnswers.q1,
          q2: finalAnswers.q2,
          q3: finalAnswers.q3,
          q4: finalAnswers.q4,
          q5: finalAnswers.q5,
          q6: finalAnswers.q6,
          q7: finalAnswers.q7,
        }),
      });

      const data = await response.json().catch(() => null);
      console.log("[QUESTIONS] Backend response status:", response.status, data);

      if (!response.ok && response.status !== 429) {
        throw new Error(data?.message || "Something went wrong saving your answers.");
      }

      console.log("[QUESTIONS] Submission confirmed by backend!");
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("[QUESTIONS] Submission error:", err);
      setIsSubmitting(false);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong saving your answers. Please try again."
      );
      // Stay on Q7, do NOT advance, allow retry
    }
  };

  // SUCCESS SCREEN (Rendered once backend confirms successful submission)
  if (isSubmitted) {
    return (
      <SubmissionSuccess
        onContinue={() => {
          console.log("[QUESTIONS] User clicked CONTINUE on success screen. Advancing to next module...");
          onUnlockNext?.();
        }}
      />
    );
  }

  const currentQ = personalQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === 6;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div ref={cardRef} className="space-y-8 py-8 sm:py-12">
        {/* Progress Indicator (01 / 07 ... 07 / 07) */}
        <QuestionProgress current={currentQuestion + 1} total={7} />

        {/* Question Component (MCQ for Q1-Q3, Textarea for Q4-Q7) */}
        {currentQ.type === "mcq" ? (
          <MCQQuestion
            question={currentQ.question}
            options={currentQ.options || []}
            selectedValue={answers[currentQ.id] || ""}
            onSelect={(val) => handleAnswerChange(currentQ.id, val)}
          />
        ) : (
          <TextQuestion
            question={currentQ.question}
            subtitle={currentQ.subtitle}
            value={answers[currentQ.id] || ""}
            onChange={(val) => handleAnswerChange(currentQ.id, val)}
            placeholder={currentQ.placeholder}
            maxLength={currentQ.maxLength}
            isEmotionalFocalPoint={currentQ.isEmotionalFocalPoint}
          />
        )}

        {/* Validation Alert */}
        {validationError && (
          <div
            role="alert"
            className="max-w-md mx-auto p-3 rounded-xl bg-[#E88AAA]/15 border border-[#E88AAA]/35 text-center font-mono text-xs tracking-wider text-[#E88AAA] shadow-lg animate-pulse"
          >
            {validationError}
          </div>
        )}

        {/* Backend Submit Error Alert */}
        {submitError && (
          <div
            role="alert"
            className="max-w-md mx-auto p-3.5 rounded-xl bg-red-500/15 border border-red-500/35 text-center font-mono text-xs text-red-300 shadow-lg"
          >
            {submitError}
          </div>
        )}

        {/* Navigation Controls */}
        <div className="max-w-2xl mx-auto flex items-center justify-between pt-4">
          {/* BACK Button: disabled/hidden on Q1 */}
          <button
            type="button"
            id="btn-questions-back"
            onClick={handleBack}
            disabled={currentQuestion === 0 || isSubmitting}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-mono tracking-wider transition-colors cursor-pointer",
              currentQuestion === 0
                ? "opacity-0 pointer-events-none"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[#AEB6CC] hover:text-[#FFF7F0]"
            )}
          >
            <ArrowLeft size={14} />
            <span>BACK</span>
          </button>

          {/* NEXT or SUBMIT ANSWERS Button */}
          {!isLastQuestion ? (
            <button
              type="button"
              id="btn-questions-next"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#F5C84B] to-[#E88AAA] text-[#080D25] font-mono text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_20px_rgba(245,200,75,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>NEXT</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              id="btn-questions-submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={cn(
                "inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5C84B] via-[#E88AAA] to-[#F5C84B] bg-[length:200%_auto] hover:bg-right text-[#080D25] font-mono text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_25px_rgba(245,200,75,0.35)] transition-all duration-300 cursor-pointer",
                isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:scale-105 shadow-[0_0_30px_rgba(245,200,75,0.5)]"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>SAVING YOUR ANSWERS...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT ANSWERS</span>
                  <Send size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SevenQuestions;
