
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
      <div className="flex-1">
        <div className="md:pl-64">
          <main className="w-full max-w-2xl mx-auto p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
            <div className="space-y-6">
              {children}
            </div>
          </main>
          {actionButtons}
        </div>
      </div>
    </div>
  );
}
