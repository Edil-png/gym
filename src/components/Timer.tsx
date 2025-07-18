"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  onGet: (time: number) => void;
  isRunning: boolean;
  duration?: number; // в секундах
}

export function Timer({ isRunning, onGet, duration = 120 }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Запуск таймера
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

  // 🔧 Передача оставшегося времени наружу (только когда оно меняется)
  useEffect(() => {
    onGet(timeLeft);
  }, [timeLeft]);

  // Сброс таймера при остановке
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
    <div className="my-6 text-center">
      <div className="inline-block px-6 py-4 bg-gray-800 text-green-500 text-5xl font-bold rounded-xl shadow-lg border border-gray-600 animate-pulse">
        {format(timeLeft)}
      </div>
      <p className="text-sm text-gray-400 mt-2">
        {isRunning ? "Таймер запущен" : "Таймер остановлен"}
      </p>
    </div>
  );
}
