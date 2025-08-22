import type { ReactNode } from "react";
import Header from "@/components/header/Header";
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {<Header />}
      {children}
    </div>
  );
}
