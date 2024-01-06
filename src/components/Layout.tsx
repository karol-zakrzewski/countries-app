import { PropsWithChildren } from "react";
import { Navigation } from "@/components/Navigation";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};
