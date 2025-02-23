
import { ReactNode } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";

interface NapolitainLayoutProps {
  children: ReactNode;
  actionButtons: ReactNode;
}

export function NapolitainLayout({ children, actionButtons }: NapolitainLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
        <div className="w-full max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </div>
      </main>
      {actionButtons}
    </div>
  );
}
