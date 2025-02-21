
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-4xl text-cream mb-2">{title}</h1>
          {subtitle && <p className="font-inter text-cream/80">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
