"use client";

export default function AddSetModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newSet: any) => void;
}) {
  const select = ["Отжимание", "Подъем на турнике", "Приседание"];

  const handleSubmit = (exercise: string) => {
    if (!exercise.trim()) return;

    const newSet = {
      id: Date.now(),
      exercise,
      week: "1",
      time: new Date().toLocaleDateString("ru-RU"),
    };

    onAdd(newSet);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl w-[90%] max-w-md shadow-lg animate-fade-in">
        <h3 className="text-2xl font-bold text-center text-white mb-6">
          💪 Новый подход
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {select.map((el) => (
            <button
              key={el}
              onClick={() => handleSubmit(el)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white py-3 rounded-xl shadow-md transition-all duration-300"
            >
              {el}
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition"
          >
            ✖ Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
