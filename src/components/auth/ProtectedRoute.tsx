
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (!session) {
          toast.error("Vous devez être connecté pour accéder à cette page");
        }
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error);
        setIsAuthenticated(false);
        toast.error("Erreur lors de la vérification de l'authentification");
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // État de chargement pendant la vérification
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate">
        <div className="text-cream">Chargement...</div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    // Redirection vers la page de connexion avec l'emplacement actuel pour revenir après la connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si authentifié, afficher les enfants (la page protégée)
  return <>{children}</>;
};
