
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Info } from "lucide-react";

const IconInstructions = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#F5E9D7]">Instructions pour les icônes PWA</CardTitle>
          <CardDescription>Guide pour préparer les icônes de l'application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Recommandations générales</AlertTitle>
            <AlertDescription>
              Pour une expérience optimale sur tous les appareils, préparez les icônes suivantes:
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <h3 className="font-medium text-[#F5E9D7]">Favicon pour navigateurs</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>favicon.ico (32x32 pixels)</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-[#F5E9D7]">Icônes pour écran d'accueil</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>icon-192x192.png (192 × 192 pixels)</li>
              <li>icon-256x256.png (256 × 256 pixels)</li>
              <li>icon-384x384.png (384 × 384 pixels)</li>
              <li>icon-512x512.png (512 × 512 pixels)</li>
              <li>apple-touch-icon.png (180 × 180 pixels) - spécifique pour iOS</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-[#F5E9D7]">Conseils de design</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Utilisez un fond plein (pas transparent) pour les icônes mobiles</li>
              <li>Gardez un design simple et reconnaissable</li>
              <li>Incluez une marge de sécurité de 15% autour du logo</li>
              <li>Respectez les couleurs de la charte graphique</li>
              <li>Testez sur différents fonds d'écran pour la lisibilité</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-[#F5E9D7]">Liste de vérification</h3>
            <ul className="space-y-1">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-[#77BFA3]" /> Formats: PNG avec fond solide</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-[#77BFA3]" /> Tailles: 192x192, 256x256, 384x384, 512x512</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-[#77BFA3]" /> Spécifique iOS: apple-touch-icon.png (180x180)</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-[#77BFA3]" /> Favicon: format .ico pour compatibilité maximale</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconInstructions;
