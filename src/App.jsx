import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoContainer from "./components/TodoContainer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`App ${
        isDarkMode ? "dark" : ""
      } transition-colors duration-200`}
    >
      <main className="min-h-screen max-h-fit bg-slate-200 dark:bg-zinc-800 text-zinc-800 dark:text-slate-200">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <TodoContainer />
      </main>
    </div>
  );
}

export default App;
