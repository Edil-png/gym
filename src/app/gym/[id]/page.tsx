"use client";

import { dataGym } from "@/app/constants/data";
import { setWeek, setIndex } from "@/app/store/setsSlice";
import { Timer } from "@/components/Timer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";

interface Set {
  id: number;
  exercise: string;
  week: number;
  time: string;
}

const data = dataGym;

function Page() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [week, setWeekState] = useState<number>(1);
  const [currentSet, setCurrentSet] = useState<Set | null>(null);
  const [lastWeek, setLastWeek] = useState<number>();

  useEffect(() => {
    if (!id) return;

    try {
      const storedSets = localStorage.getItem("sets");
      if (storedSets) {
        const sets: Set[] = JSON.parse(storedSets);
        const found = sets.find((set) => String(set.id) === id);
        if (found) {
          setCurrentSet(found);
          const storedWeek = localStorage.getItem(`week-${id}`);
          const savedIndex = localStorage.getItem(`progress-${id}`);
          const parsedWeek = storedWeek ? Number(storedWeek) : found.week;
          const parsedIndex = savedIndex ? Number(savedIndex) : 0;

          setWeekState(parsedWeek);
          setCurrentIndex(parsedIndex);

          dispatch(setWeek({ id, week: parsedWeek }));
          dispatch(setIndex({ id, index: parsedIndex }));
        }
      }
    } catch (err) {
      console.error("Ошибка чтения из localStorage:", err);
    }
  }, [id, dispatch]);

  const updateWeek = (newWeek: number) => {
    setWeekState(newWeek);
    dispatch(setWeek({ id, week: newWeek }));
    localStorage.setItem(`week-${id}`, String(newWeek));
    setCurrentIndex(0);
    dispatch(setIndex({ id, index: 0 }));
    localStorage.setItem(`progress-${id}`, "0");
    setStart(false);
  };

  const updateIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
    dispatch(setIndex({ id, index: newIndex }));
    localStorage.setItem(`progress-${id}`, String(newIndex));
  };

  const getAdjustedReps = (exercise: string, week: number): number[] => {
    const base = data[exercise];
    if (!base) return [];
    if (Array.isArray(base)) return base;
    return base[week] || [];
  };

  useEffect(() => {
    if (!currentSet?.exercise) return;

    const base = data[currentSet.exercise];
    if (!base || Array.isArray(base)) return;

    const weeks = Object.keys(base)
      .map(Number)
      .sort((a, b) => b - a);

    setLastWeek(weeks.length);
  }, [currentSet]);

  const getLastWeekReps = (exercise: string): number[] => {
    const base = data[exercise];
    if (!base) return [];
    if (Array.isArray(base)) return base;

    const weeks = Object.keys(base)
      .map(Number)
      .sort((a, b) => b - a);

    return base[weeks[0]] || [];
  };

  const adjustedReps = currentSet?.exercise
    ? getAdjustedReps(currentSet.exercise, week)
    : [];

  const lastWeekReps = currentSet?.exercise
    ? getLastWeekReps(currentSet.exercise)
    : [];

  const handleRestClick = () => {
    if (!start) {
      setStart(true);
    } else {
      setStart(false);
      if (currentIndex < adjustedReps.length - 1) {
        updateIndex(currentIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (currentIndex >= adjustedReps.length && adjustedReps.length > 0) {
      setStart(false);
      setTimeout(() => {
        updateWeek(Math.min(week + 1, 30));
      }, 2000);
    }
  }, [currentIndex, adjustedReps, week]);

  const onGetTimer = (time: number) => {
    if (time <= 0) {
      setStart(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-6 min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-green-400/20 to-blue-400/10 blur-2xl opacity-50 pointer-events-none" />

      <button
        onClick={() => router.push("/")}
        className="text-2xl font-bold text-green-400 hover:text-green-300 transition mb-6"
      >
        ← Назад
      </button>

      <h1 className="text-4xl font-extrabold mb-1">{currentSet?.exercise}</h1>
      <p className="text-sm text-gray-400 mb-4">{new Date().toLocaleDateString("ru-RU")}</p>

      <section className="bg-gray-800 p-4 rounded-2xl shadow-lg mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-yellow-300">Неделя: {week}</h2>
            <p className="text-sm text-gray-400 mt-2">Всего недель: {lastWeek}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => lastWeek && updateWeek(Math.min(week + 1, lastWeek))}
              className="bg-blue-400 hover:bg-blue-300 transition text-black font-semibold rounded-xl px-4 py-2 disabled:opacity-40"
              disabled={lastWeek ? week >= lastWeek : true}
            >
              След.
            </button>
            <button
              onClick={() => updateWeek(Math.max(week - 1, 1))}
              className="bg-blue-200 hover:bg-blue-100 transition text-black font-semibold rounded-xl px-4 py-2 disabled:opacity-40"
              disabled={week <= 1}
            >
              Пред.
            </button>
          </div>
        </div>
      </section>

      <p className="text-xl text-center mb-4">
        Подход <span className="text-white font-bold">{currentIndex + 1}</span> / {adjustedReps.length}
      </p>

      {currentIndex === adjustedReps.length - 1 ? (
        <button
          onClick={() => router.push("/")}
          className="w-full bg-green-500 hover:bg-green-400 transition text-black font-bold py-4 rounded-2xl mb-6"
        >
          ✅ Завершить тренировку
        </button>
      ) : (
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={handleRestClick}
            className={`w-full text-black font-semibold py-3 rounded-xl transition ${
              start ? "bg-orange-500 hover:bg-orange-400" : "bg-green-500 hover:bg-green-400"
            }`}
          >
            {start ? "Завершить отдых" : "Начать отдых"}
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-red-500 hover:bg-red-400 text-black font-semibold py-3 rounded-xl"
          >
            ❌ Отменить тренировку
          </button>
        </div>
      )}

      <div className="bg-gray-800 rounded-2xl p-4 mb-6 shadow-inner text-center">
        {!start ? (
          <p className="text-4xl font-bold bg-green-500 text-black inline-block px-6 py-2 rounded-2xl animate-pulse">
            Нужно сделать: {adjustedReps[currentIndex]}
          </p>
        ) : (
          <Timer onGet={onGetTimer} isRunning={start} />
        )}
      </div>

      {adjustedReps.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6 bg-gray-900 rounded-3xl p-5 shadow-lg">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-blue-300">Текущая неделя</h2>
            {adjustedReps.map((count, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>Подход {index + 1}</span>
                <span
                  className={`px-4 py-1 rounded-full font-bold ${
                    index === currentIndex
                      ? "bg-yellow-400 text-black"
                      : index < currentIndex
                      ? "bg-green-500 text-black"
                      : "bg-red-500"
                  }`}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Последняя неделя</h2>
            {lastWeekReps.map((count, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>Подход {index + 1}</span>
                <span className="px-4 py-1 rounded-full font-bold bg-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentIndex >= adjustedReps.length && (
        <p className="text-center mt-6 text-green-400 text-xl font-bold animate-bounce">
          🎉 Все подходы выполнены!
        </p>
      )}
    </main>
  );
}

export default Page;
