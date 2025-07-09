"use client";

import { useAppSelector } from "@/app/store/hooks";
import { Timer } from "@/components/Timer";
import { useParams } from "next/navigation";
import { useState } from "react";

function Page() {
  const time = new Date();
  const [start, setStart] = useState(false);
  const params = useParams();
  const { id } = params;
  const gym = useAppSelector((prev) => prev.sets.sets);
  const currentSet = gym.find((set) => String(set.id) === id);
  console.log(currentSet);
  return (
    <main className="max-w-md mx-auto p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold">{currentSet?.exercise}</h1>
      <p className="text-sm text-gray-400">
        {new Date().toLocaleDateString("ru-RU")}
      </p>

      <section>
        <h2 className="text-lg font-semibold mb-2">Текущий подходы</h2>
        <h2 className="text-lg font-semibold mb-2">Нужно сделать 5</h2>
      </section>

      <div className="flex flex-col m-auto gap-[10px] py-[10px]">
        {!start ? (
          <button
            onClick={() => setStart(!start)}
            className="bg-green-400 rounded-2xl p-[15px] max-w-[130px]"
          >
            Начать отдых
          </button>
        ) : (
          <button
            onClick={() => setStart(!start)}
            className="bg-orange-400 rounded-2xl p-[15px] max-w-[130px]"
          >
            Завершить отдых
          </button>
        )}
        <button className="bg-red-400 rounded-2xl p-[15px] max-w-[130px]">
          Отменить тренировку
        </button>
      </div>

      <div className="flex-col bg-blue-950 rounded-3xl p-[20px]">
        <div className="flex gap-[10px]">
          <div>Подход 1</div>
          <div className="bg-red-500 px-[5px]">6</div>
        </div>
        <div className="flex gap-[10px]">
          <div>Подход 2</div>
          <div className="bg-red-400 px-[5px]">5</div>
        </div>
        <div className="flex gap-[10px]">
          <div>Подход 3</div>
          <div className="bg-red-400 px-[5px]">5</div>
        </div>
        <div className="flex gap-[10px]">
          <div>Подход 4</div>
          <div className="bg-red-300 px-[5px]">4</div>
        </div>
        <div className="flex gap-[10px]">
          <div>Подход 5</div>
          <div className="bg-red-200 px-[5px]">3</div>
        </div>
      </div>
      <Timer isRunning={start} />
    </main>
  );
}

export default Page;
