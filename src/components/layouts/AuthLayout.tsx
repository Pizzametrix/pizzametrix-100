
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
    <div className="min-h-screen w-full flex flex-col p-4 bg-slate">
      {/* Logo en haut à gauche */}
      <div className="w-full">
        <Link 
          to={homeLink}
          className="inline-block text-[#F5E9D7] text-2xl font-montserrat font-bold hover:text-[#77BFA3] transition-colors"
        >
          Pizzametrix
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center">
            <h1 className="font-montserrat font-bold text-4xl text-cream mb-2">{title}</h1>
            {subtitle && <p className="font-inter text-cream/80">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
