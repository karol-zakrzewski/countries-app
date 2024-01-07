import Link from "next/link";
import { IoMoonOutline } from "react-icons/io5";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 inset-x-0 bg-white shadow-md dark:bg-gray-700 dark:text-white dark:shadow-gray-900 px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        Where in the world?
      </Link>

      <button
        onClick={() => {
          const isDarkMode = localStorage.theme === "dark";
          if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.removeItem("theme");
            return;
          }

          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }}
        className="font-semibold text-sm border border-transparent hover:border-gray-200 transition rounded-lg px-4 py-2 flex gap-2 items-center"
      >
        <IoMoonOutline />
        <span>Dark Mode</span>
      </button>
    </nav>
  );
};
