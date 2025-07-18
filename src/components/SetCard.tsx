"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // иконка удаления

export default function SetCard({ data, onRemove }: any) {
  const [week, setWeek] = useState<string | null>("");

  useEffect(() => {
    const saved = localStorage.getItem(`week-${data.id}`);
    setWeek(saved || data.week);
  }, []);

  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 shadow-md p-4 rounded-2xl mb-4 flex justify-between items-start gap-3 hover:shadow-lg transition-all">
      <div className="flex-1 text-white">
        <p className="text-lg font-bold">{data.exercise}</p>
        <p className="text-sm text-gray-300">Текущая неделя: <span className="font-medium text-white">{week}</span></p>
        <p className="text-sm text-gray-400">Общая неделя: 30</p>
        <p className="text-xs text-gray-500 mt-1">Создано: {data.time}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => router.push(`/gym/${data.id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-lg transition"
        >
          Начать
        </button>

        <button
          onClick={onRemove}
          title="Удалить подход"
          className="text-red-400 hover:text-red-600 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
