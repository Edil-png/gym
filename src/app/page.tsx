"use client";

import { useEffect, useState } from "react";
import AddSetModal from "../components/AddSetModal";
import SetCard from "../components/SetCard";

export default function HomePage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [sets, setSets] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sets");
    if (stored) {
      setSets(JSON.parse(stored));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("sets", JSON.stringify(sets));
    }
  }, [sets, isInitialized]);

  const handleRemove = (index: number) => {
    setSets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = (newSet: any) => {
    setSets((prev) => [...prev, newSet]);
  };

  return (
    <main className="max-w-md mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-center animate-fade-in">
          🏋️ Тренировка на 30 недель
        </h1>
        <p className="text-sm text-center text-gray-400 mt-1">
          {new Date().toLocaleDateString("ru-RU")}
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition"
          >
            ➕ Добавить подход
          </button>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-bold mb-3 text-blue-300">
          📋 Список подходов
        </h2>

        {sets.length === 0 ? (
          <p className="text-gray-400 text-center mt-6">Пока нет подходов</p>
        ) : (
          <div className="space-y-4">
            {sets.map((set, i) => (
              <SetCard key={i} data={set} onRemove={() => handleRemove(i)} />
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <AddSetModal onClose={() => setModalOpen(false)} onAdd={handleAdd} />
      )}
    </main>
  );
}
