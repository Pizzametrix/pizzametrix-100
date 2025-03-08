
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const UpdateNotification = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Vérifie s'il y a une mise à jour disponible
  useEffect(() => {
    // Enregistrer le service worker
    if ('serviceWorker' in navigator) {
      // Enregistrer le service worker et stocker l'enregistrement
      navigator.serviceWorker.ready.then(reg => {
        setRegistration(reg);
      });

      // Lorsque le service worker est mis à jour
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Si nous n'avons pas encore détecté de mise à jour, afficher la notification
        if (!isUpdateAvailable) {
          setIsUpdateAvailable(true);
          
          toast({
            title: "Mise à jour disponible",
            description: "Une nouvelle version de l'application est disponible.",
            action: (
              <Button 
                onClick={() => window.location.reload()} 
                variant="default" 
                className="flex items-center bg-[#77BFA3] hover:bg-[#77BFA3]/80"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Mettre à jour
              </Button>
            ),
            duration: 0, // Ne disparait pas automatiquement
          });
        }
      });

      // Vérifier les mises à jour périodiquement
      const checkForUpdates = () => {
        navigator.serviceWorker.ready.then(registration => {
          registration.update().catch(error => {
            console.error('Erreur lors de la vérification des mises à jour:', error);
          });
        });
      };

      // Vérifier immédiatement au chargement
      checkForUpdates();
      
      // Puis vérifier toutes les heures
      const interval = setInterval(checkForUpdates, 60 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [isUpdateAvailable]);

  return null; // Ce composant n'affiche rien directement, il utilise le système de toast
};
