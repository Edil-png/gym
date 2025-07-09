"use client";
import { useRouter } from "next/navigation";

export default function SetCard({ data, onRemove }: any) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-3 flex justify-between items-start">
      <div>
        <p className="font-semibold">{data.exercise}</p>
        <p className="text-sm text-gray-300">Текущий неделя: {data.week}</p>
        <p className="text-sm text-gray-300">Общая неделя: 30</p>

        <p className="text-xs text-gray-500">Дата создание: {data.time}</p>
      </div>
      <button onClick={() => router.push(`/gym/${data.id}`)}>Начать</button>

      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-600 text-xl font-bold"
      >
        х
      </button>
    </div>
  );
}
