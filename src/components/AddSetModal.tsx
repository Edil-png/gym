"use client";

import { useAppDispatch } from "@/app/store/hooks";
import { addSet } from "@/app/store/setsSlice";
import { useState } from "react";

export default function AddSetModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [exercise, setExercise] = useState("");
  const [week, setWeek] = useState("1");

  const handleSubmit = () => {
    if (!exercise.trim()) return;

    dispatch(
      addSet({
        id: Date.now(),
        exercise,
        week,
        time: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
    );

    setExercise("");
    onClose(); // закрываем модалку
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
        <h3 className="text-xl font-semibold mb-4">Новый подход</h3>
        <input
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Упражнение"
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Закрыть
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
