import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        Where in the world?
      </Link>

      <button className="font-semibold text-sm border border-transparent hover:border-gray-200 transition rounded-lg px-4 py-2">
        ☾ Dark Mode
      </button>
    </nav>
  );
};