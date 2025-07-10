"use client";

import { Timer } from "@/components/Timer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const data = {
  Отжимание: [20, 20, 15, 15, 10],
  "Подьем на турнике": [6, 5, 5, 4, 3],
  Приседание: [8, 10, 8, 8, 6],
};

interface Set {
  id: number;
  exercise: string;
  week: number;
  time: string;
}

function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [week, setWeek] = useState<number>(1);
  const [currentSet, setCurrentSet] = useState<Set | null>(null);

  // Загружаем данные из localStorage
  useEffect(() => {
    const storedSets = localStorage.getItem("sets");
    if (storedSets) {
      const sets: Set[] = JSON.parse(storedSets);
      const found = sets.find((set) => String(set.id) === id);
      if (found) {
        setCurrentSet(found);
        const storedWeek = localStorage.getItem(`week-${id}`);
        setWeek(storedWeek ? Number(storedWeek) : found.week);
      }
    }
  }, [id]);

  // Сохраняем неделю в localStorage при изменении
  useEffect(() => {
    if (id) {
      localStorage.setItem(`week-${id}`, String(week));
    }
  }, [week, id]);

  const getAdjustedReps = (exercise: string, week: number) => {
    const baseReps = data[exercise] || [];
    const increase = (week - 1) * 2;
    return baseReps.map((rep) => rep + increase);
  };

  const adjustedReps =
    currentSet?.exercise && week
      ? getAdjustedReps(currentSet.exercise, week)
      : [];

  const finishGym = adjustedReps.map((el) => el * 30);

  const handleRestClick = () => {
    if (!start) {
      setStart(true); // начинаем отдых
    } else {
      setStart(false); // завершаем отдых и переходим к следующему подходу
      if (currentIndex < adjustedReps.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <main className="max-w-md mx-auto p-4 text-white bg-gray-900 min-h-screen">
      <button
        onClick={() => router.push("/")}
        className="text-4xl m-auto font-bold text-green-500 mb-4"
      >
        Домой
      </button>

      <h1 className="text-2xl font-bold mb-1">
        {currentSet?.exercise || "Упражнение не найдено"}
      </h1>

      <p className="text-sm text-gray-400 mb-4">
        {new Date().toLocaleDateString("ru-RU")}
      </p>

      <section className="mb-4 flex flex-row justify-between">
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-lg font-semibold mb-1">Текущая неделя: {week}</h2>
          <h2 className="text-lg font-semibold">Общая неделя: 30</h2>
        </div>
        <div className="flex flex-col gap-[10px] p-[8px]">
          <button
            onClick={() => setWeek((prev) => Math.min(prev + 1, 30))}
            className="rounded-3xl p-[10px] bg-blue-300 text-black"
          >
            След... неделя
          </button>
          <button
            onClick={() => setWeek((prev) => Math.max(prev - 1, 1))}
            className="rounded-3xl p-[10px] bg-blue-200 text-black"
          >
            Пред... неделя
          </button>
        </div>
      </section>

      {currentIndex === adjustedReps.length - 1 ? (
        <button
          onClick={() => router.push("/")}
          className="bg-green-400 p-[25px_20px] rounded-3xl m-auto"
        >
          Завершить тренировку
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3 py-4">
          <button
            onClick={handleRestClick}
            className={`${
              start ? "bg-orange-400" : "bg-green-400"
            } rounded-2xl p-[15px] w-[160px]`}
          >
            {start ? "Завершить отдых" : "Начать отдых"}
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-red-400 rounded-2xl p-[15px] w-[160px]"
          >
            Отменить тренировку
          </button>
        </div>
      )}

      <Timer isRunning={start} />

      {adjustedReps.length > 0 && (
        <div className="flex-row gap-[30px] flex bg-blue-950 rounded-3xl p-5 mt-4">
          <div>
            {adjustedReps.map((count, index) => (
              <div key={index} className="flex gap-4 mb-2 items-center">
                <div>Подход {index + 1}</div>
                <div
                  className={`px-3 py-1 rounded ${
                    index === currentIndex
                      ? "bg-yellow-400 text-black font-bold"
                      : "bg-red-400"
                  }`}
                >
                  {count}
                </div>
              </div>
            ))}
          </div>
          <div>
            {finishGym.map((count, index) => (
              <div key={index} className="flex gap-4 mb-2 items-center">
                <div>Подход {index + 1}</div>
                <div className="px-3 py-1 rounded font-bold bg-red-400">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentIndex >= adjustedReps.length && (
        <p className="text-center mt-4 text-green-400 font-bold text-xl">
          Все подходы выполнены!
        </p>
      )}
    </main>
  );
}

export default Page;
