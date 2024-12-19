import { useState } from "react";
import { FaCheckCircle, FaRegTimesCircle, FaArrowsAltH } from "react-icons/fa";

const TodoList = ({
  title,
  items,
  setItems,
  isNotTodoList,
  onTransferItem,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setItems([...items, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleToggleComplete = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSortItems = () => {
    setItems([...items].sort((a, b) => a.text.localeCompare(b.text)));
  };

  const containerClasses = isNotTodoList
    ? "bg-red-600 dark:bg-red-900"
    : "bg-blue-700 dark:bg-blue-900";

  return (
    <div
      className={`w-full md:w-1/2 text-slate-200 ${containerClasses} p-4 rounded-lg`}
    >
      <h2 className="mb-2 text-lg md:text-xl text-center font-bold">{title}</h2>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-5"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 text-zinc-200 dark:text-zinc-950 border rounded w-full"
          placeholder={`Add a ${isNotTodoList ? "Not To-Do" : "To-Do"}`}
        />
        <button
          type="submit"
          className={`py-2 px-3 ${
            isNotTodoList
              ? "bg-red-400 hover:bg-red-500"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
        >
          Add
        </button>
      </form>

      <ul className="mt-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-slate-300 dark:bg-gray-700 p-2 rounded mb-2"
          >
            <span
              className={
                item.completed
                  ? "text-zinc-950 dark:text-zinc-200 line-through"
                  : "text-zinc-950 dark:text-zinc-200"
              }
            >
              {item.text}
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleToggleComplete(index)}
                className="text-green-500 w-"
              >
                <FaCheckCircle />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500"
              >
                <FaRegTimesCircle />
              </button>
              <button
                onClick={() => onTransferItem(index)}
                className="text-blue-500"
              >
                <FaArrowsAltH />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSortItems}
        className={`mt-4 p-2 rounded ${
          isNotTodoList
            ? "bg-red-400 hover:bg-red-500"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Sort
      </button>
    </div>
  );
};

export default TodoList;
