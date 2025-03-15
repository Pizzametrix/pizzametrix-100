
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  isEnglish?: boolean;
}

export const AuthLayout = ({ children, title, subtitle, isEnglish = false }: AuthLayoutProps) => {
  const homeLink = isEnglish ? "/" : "/fr";
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <Link 
            to={homeLink}
            className="inline-block mb-6 text-[#F5E9D7] text-3xl font-montserrat font-bold hover:text-[#77BFA3] transition-colors"
          >
            Pizzametrix
          </Link>
          <h1 className="font-montserrat font-bold text-4xl text-cream mb-2">{title}</h1>
          {subtitle && <p className="font-inter text-cream/80">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
