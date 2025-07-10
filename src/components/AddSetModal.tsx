"use client";

export default function AddSetModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (newSet: any) => void;
}) {
  const select = ["Отжимание", "Подьем на турнике", "Приседание"];

  const handleSubmit = (exercise: string) => {
    if (!exercise.trim()) return;

    const newSet = {
      id: Date.now(),
      exercise,
      week: "1",
      time: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onAdd(newSet);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
        <h3 className="text-xl font-semibold mb-4">Новый подход</h3>

        <div className="grid grid-cols-2 gap-[14px]">
          {select.map((el) => {
            return (
              <div
                onClick={() => handleSubmit(el)}
                className="bg-gray-500 rounded-3xl hover:bg-gray-400 cursor-pointer px-[10px] items-center text-center max-w-[200px] m-auto p-[5px]"
              >
                {el}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-2 mt-[10px]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
