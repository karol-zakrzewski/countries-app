import { PropsWithChildren } from "react";
import { Navigation } from "@/components/Navigation";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navigation />
      <main className="bg-slate-100 w-full flex flex-col items-center">
        {children}
      </main>
    </div>
  );
};
