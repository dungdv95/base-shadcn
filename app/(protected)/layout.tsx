import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar/index";
import { LoadingGlobal } from "@/components/loading/LoadingGlobal";

export const metadata = {
  title: "EID-Merchants",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen">
      <div className="relative flex max-w-full flex-1 flex-col overflow-hidden">
        <div className="relative z-0 flex flex-auto flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1">
            <LoadingGlobal />
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
