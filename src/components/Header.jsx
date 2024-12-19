import { FaSun, FaMoon } from "react-icons/fa";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="flex items-center justify-center py-6 px-4 sm:px-10">
      <button onClick={toggleDarkMode} className="absolute right-10 text-2xl">
        {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
      </button>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-center">
        To Do or Not To Do?
      </h1>
    </header>
  );
};

export default Header;
