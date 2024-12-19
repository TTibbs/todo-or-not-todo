const TodoList = ({
  title,
  inputId,
  inputValue,
  setInputValue,
  items,
  onAddItem,
  onDeleteItem,
  onToggleComplete,
  onTransferItem,
  isNotTodoList,
  iconSrc,
  buttonColor,
  hoverColor,
  bgColor,
  darkBgColor,
  borderColor,
  editingIndex,
  editingText,
  setEditingText,
  editingList,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  setItems,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onAddItem(inputValue);
    }
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSaveEdit(index);
    }
  };

  const handleSortItems = () => {
    const sortedList = [...items].sort((a, b) => a.text.localeCompare(b.text));
    setItems(sortedList);
  };

  return (
    <div
      className={`w-full h-fit md:w-1/2 text-slate-200 ${bgColor} dark:${darkBgColor} p-4 rounded-lg`}
    >
      <h2 className="mb-2 text-lg md:text-xl text-center font-bold">{title}</h2>
      <hr className={`w-1/2 md:w-2/3 mb-4 border-2 ${borderColor} mx-auto`} />

      <div className="flex flex-col items-center">
        <label
          htmlFor={inputId}
          className="mb-2 font-semibold text-base md:text-lg"
        >
          {isNotTodoList ? "Not To Do" : "To Do"}
        </label>
        <div className="relative w-full max-w-xs md:max-w-lg">
          <input
            type="text"
            id={inputId}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="p-2 pl-10 text-zinc-950 border rounded bg-white w-full"
          />
          <img
            src={iconSrc}
            alt={`${isNotTodoList ? "Not To-Do" : "To-Do"} Icon`}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
        <button
          onClick={() => onAddItem(inputValue)}
          className={`mt-2 ${buttonColor} text-white p-2 rounded-lg hover:${hoverColor} border-slate-100 border-2`}
        >
          Add {isNotTodoList ? "Not To-Do" : "To-Do"}
        </button>
      </div>

      <ul className="mt-4 flex-col items-center justify-center">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-zinc-950 dark:text-slate-200 bg-slate-300 dark:bg-gray-700 p-2 rounded mb-2"
          >
            {editingIndex === index &&
            editingList === (isNotTodoList ? "notTodos" : "todos") ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => handleEditKeyDown(e, index)}
                className="mr-2 p-1 text-black"
                autoFocus
              />
            ) : (
              <span className={item.completed ? "line-through" : ""}>
                {item.text}
              </span>
            )}
            <div className="flex items-center justify-between">
              {editingIndex === index &&
              editingList === (isNotTodoList ? "notTodos" : "todos") ? (
                <>
                  <button
                    onClick={() => onSaveEdit(index)}
                    className="mr-2 bg-green-500 text-white p-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancelEditing}
                    className="mr-2 bg-gray-500 text-white p-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onStartEditing(index, item.text)}
                    className="mr-2"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/edit.png"
                      alt="Edit"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    onClick={() => onToggleComplete(index)}
                    className="mr-2"
                  >
                    <img
                      src={`https://img.icons8.com/color/48/000000/${
                        item.completed
                          ? "checked-checkbox"
                          : "unchecked-checkbox"
                      }.png`}
                      alt="Complete"
                      className="w-6 h-6"
                    />
                  </button>
                  <button onClick={() => onDeleteItem(index)} className="mr-2">
                    <img
                      src="https://img.icons8.com/color/48/000000/trash.png"
                      alt="Delete"
                      className="w-6 h-6"
                    />
                  </button>
                  <button onClick={() => onTransferItem(index)}>
                    <img
                      src={`https://img.icons8.com/color/48/000000/${
                        isNotTodoList ? "ok" : "do-not-disturb"
                      }.png`}
                      alt="Transfer"
                      className="w-6 h-6"
                    />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSortItems}
        className={`p-2 ${
          isNotTodoList
            ? "bg-red-400 hover:bg-red-500"
            : "bg-blue-500 hover:bg-blue-600"
        } rounded-lg border-slate-100 border-2`}
      >
        Sort {isNotTodoList ? "Not To Do" : "To Do"}
      </button>
    </div>
  );
};

export default TodoList;
