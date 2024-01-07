import { PropsWithChildren } from "react";
import { Navigation } from "@/components/ui/Navigation";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation />
      <main className="bg-slate-100 dark:bg-gray-800 w-full flex flex-col min-h-[calc(100vh-70px)] items-center">
        {children}
      </main>
    </>
  );
};
