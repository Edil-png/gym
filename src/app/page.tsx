"use client";

import { useEffect, useState } from "react";
import AddSetModal from "../components/AddSetModal";
import SetCard from "../components/SetCard";

export default function HomePage() {
  const [sets, setSets] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ Загрузка из localStorage при старте
  useEffect(() => {
    const stored = localStorage.getItem("sets");
    if (stored) {
      setSets(JSON.parse(stored));
    }
  }, []);

 

  const handleRemove = (index: number) => {
    setSets((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-md mx-auto p-4 text-white bg-gray-900 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Тренировка на 30 недель</h1>
        <p className="text-sm text-gray-400">
          {new Date().toLocaleDateString("ru-RU")}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Добавить подход
        </button>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-2">Список подходов</h2>
        {sets.map((set, i) => (
          <SetCard key={i} data={set} onRemove={() => handleRemove(i)} />
        ))}
      </section>

      {isModalOpen && <AddSetModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
