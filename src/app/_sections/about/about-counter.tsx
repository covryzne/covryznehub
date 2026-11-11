"use client";

import { lazy, Suspense, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CountUp = lazy(() => import("@/components/CountUp"));

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  minDigits?: number;
};

/** Replay on viewport re-entry; hovering never resets the value. */
export default function AboutCounter({ value, suffix = "", decimals = 0, minDigits = 1 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false });
  const reducedMotion = useReducedMotion();
  const [integer, fraction] = value.toFixed(decimals).split(".");
  const finalText = `${integer.padStart(minDigits, "0")}${fraction ? `.${fraction}` : ""}${suffix}`;

  return (
    <span ref={ref} className="about-stat-counter">
      <span aria-hidden="true">
        {inView && !reducedMotion ? (
          <Suspense fallback={finalText}>
            <CountUp
              from={0}
              to={value}
              mode="count"
              easing="easeOut"
              format="standard"
              separator=""
              suffix={suffix}
              decimals={decimals}
              minIntegerDigits={minDigits}
              direction="up"
              duration={3.2}
              delay={0}
              trigger="view"
              replayOnHover={false}
              className="count-up-text"
              style={{ fontSize: "inherit", fontWeight: "inherit" }}
            />
          </Suspense>
        ) : finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
