"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  isRunning: boolean;
  duration?: number; // в секундах
}

export function Timer({ isRunning, duration = 120 }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Сброс таймера, если перезапускаем
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(duration);
    }
  }, [isRunning, duration]);

  const format = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="text-3xl font-mono text-center my-4">
      {format(timeLeft)}
    </div>
  );
}
