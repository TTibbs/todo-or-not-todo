import { useState, useEffect } from "react";
import TodoList from "./TodoList";

const TodoContainer = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [notTodos, setNotTodos] = useState(() => {
    const savedNotTodos = localStorage.getItem("notTodos");
    return savedNotTodos ? JSON.parse(savedNotTodos) : [];
  });

  const [todoInput, setTodoInput] = useState("");
  const [notTodoInput, setNotTodoInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingList, setEditingList] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("notTodos", JSON.stringify(notTodos));
  }, [notTodos]);

  const handleAddTodo = (input, list, setList, setInput) => {
    if (input.trim() !== "") {
      setList([...list, { text: input, completed: false }]);
      setInput("");
    }
  };

  const handleDeleteTodo = (index, list, setList) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const handleToggleComplete = (index, list, setList) => {
    const newList = list.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setList(newList);
  };

  const handleTransferTodo = (
    index,
    fromList,
    setFromList,
    toList,
    setToList
  ) => {
    const itemToMove = fromList[index];
    setFromList(fromList.filter((_, i) => i !== index));
    setToList([...toList, itemToMove]);
  };

  const handleStartEditing = (listName, index, text) => {
    setEditingIndex(index);
    setEditingText(text);
    setEditingList(listName);
  };

  const handleCancelEditing = () => {
    setEditingIndex(null);
    setEditingText("");
    setEditingList(null);
  };

  const handleSaveEdit = (list, setList, index) => {
    if (editingText.trim() !== "") {
      const newList = list.map((item, i) =>
        i === index ? { ...item, text: editingText } : item
      );
      setList(newList);
      setEditingIndex(null);
      setEditingText("");
      setEditingList(null);
    }
  };

  return (
    <section className="px-10 py-8">
      <div className="flex flex-col md:flex-row justify-between gap-8 relative">
        <TodoList
          title="Got something to do?"
          inputId="toDo"
          inputValue={todoInput}
          setInputValue={setTodoInput}
          items={todos}
          onAddItem={(input) =>
            handleAddTodo(input, todos, setTodos, setTodoInput)
          }
          onDeleteItem={(index) => handleDeleteTodo(index, todos, setTodos)}
          onToggleComplete={(index) =>
            handleToggleComplete(index, todos, setTodos)
          }
          onTransferItem={(index) =>
            handleTransferTodo(index, todos, setTodos, notTodos, setNotTodos)
          }
          onStartEditing={(index, text) =>
            handleStartEditing("todos", index, text)
          }
          onCancelEditing={handleCancelEditing}
          onSaveEdit={(index) => handleSaveEdit(todos, setTodos, index)}
          isNotTodoList={false}
          iconSrc="https://img.icons8.com/color/48/000000/task--v1.png"
          buttonColor="bg-blue-500"
          hoverColor="bg-blue-600"
          bgColor="bg-blue-700"
          darkBgColor="bg-blue-900"
          borderColor="border-blue-500"
          editingIndex={editingIndex}
          editingText={editingText}
          setEditingText={setEditingText}
          editingList={editingList}
          setItems={setTodos}
        />

        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

        <TodoList
          title="Got something not to do?"
          inputId="notToDo"
          inputValue={notTodoInput}
          setInputValue={setNotTodoInput}
          items={notTodos}
          onAddItem={(input) =>
            handleAddTodo(input, notTodos, setNotTodos, setNotTodoInput)
          }
          onDeleteItem={(index) =>
            handleDeleteTodo(index, notTodos, setNotTodos)
          }
          onToggleComplete={(index) =>
            handleToggleComplete(index, notTodos, setNotTodos)
          }
          onTransferItem={(index) =>
            handleTransferTodo(index, notTodos, setNotTodos, todos, setTodos)
          }
          onStartEditing={(index, text) =>
            handleStartEditing("notTodos", index, text)
          }
          onCancelEditing={handleCancelEditing}
          onSaveEdit={(index) => handleSaveEdit(notTodos, setNotTodos, index)}
          isNotTodoList={true}
          iconSrc="https://img.icons8.com/color/48/000000/do-not-disturb.png"
          buttonColor="bg-red-400"
          hoverColor="bg-red-500"
          bgColor="bg-red-600"
          darkBgColor="bg-red-900"
          borderColor="border-red-400"
          editingIndex={editingIndex}
          editingText={editingText}
          setEditingText={setEditingText}
          editingList={editingList}
          setItems={setNotTodos}
        />
      </div>
    </section>
  );
};

export default TodoContainer;
