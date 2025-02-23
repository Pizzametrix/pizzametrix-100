
import { ReactNode } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";

interface TegliaLayoutProps {
  children: ReactNode;
  actionButtons: ReactNode;
}

export function TegliaLayout({ children, actionButtons }: TegliaLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate">
      <Sidebar />
      <div className="flex-1">
        <div className="md:pl-64">
          <main className="w-full max-w-2xl mx-auto p-4 pb-24 md:p-8 md:pb-24 mt-16 md:mt-0">
            <h1 className="hidden md:block font-montserrat font-bold text-2xl text-cream mb-8">
              Pizza Teglia
            </h1>
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
