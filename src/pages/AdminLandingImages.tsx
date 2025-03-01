
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { LandingImageUploader } from "@/components/admin/LandingImageUploader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Type pour les assets
interface Asset {
  id: string;
  section: string;
  alt_text: string;
  storage_path: string;
  dimensions: string | null;
  url?: string;
}

export default function AdminLandingImages() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Fonction pour charger les assets
  const loadAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('landing_assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Ajouter l'URL publique à chaque asset
      const assetsWithUrls = data.map(asset => ({
        ...asset,
        url: getPublicUrl(asset.storage_path)
      }));
      
      setAssets(assetsWithUrls);
    } catch (error) {
      console.error("Erreur lors du chargement des assets:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Obtenir l'URL publique d'un fichier
  const getPublicUrl = (path: string): string => {
    const { data } = supabase.storage
      .from('landing_assets')
      .getPublicUrl(path);
    
    return data.publicUrl;
  };
  
  // Supprimer un asset
  const deleteAsset = async (asset: Asset) => {
    try {
      // 1. Supprimer le fichier du storage
      const { error: storageError } = await supabase.storage
        .from('landing_assets')
        .remove([asset.storage_path]);
      
      if (storageError) throw storageError;
      
      // 2. Supprimer l'entrée de la base de données
      const { error: dbError } = await supabase
        .from('landing_assets')
        .delete()
        .eq('id', asset.id);
      
      if (dbError) throw dbError;
      
      // 3. Mettre à jour la liste
      setAssets(assets.filter(a => a.id !== asset.id));
      
      toast({
        title: "Suppression réussie",
        description: "L'image a été supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image",
        variant: "destructive",
      });
    }
  };
  
  // Charger les assets au chargement de la page et après un upload réussi
  useEffect(() => {
    loadAssets();
  }, []);
  
  return (
    <div className="min-h-screen bg-[#2C2C2C] text-[#F5E9D7] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-montserrat font-bold">Administration des images</h1>
          <Link to="/fr">
            <Button variant="outline" className="border-[#F5E9D7] text-[#F5E9D7] hover:bg-[#F5E9D7]/10">
              Retour à la landing page
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <LandingImageUploader onUploadSuccess={loadAssets} />
            
            <div className="mt-8 p-4 border rounded-lg bg-slate-700 border-slate-600">
              <h3 className="text-lg font-montserrat font-medium mb-4">Guide d'utilisation</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-[#77BFA3]">Sections</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><span className="font-medium">Hero</span> - Images principales en haut de page</li>
                    <li><span className="font-medium">Fonctionnalités</span> - Images des caractéristiques</li>
                    <li><span className="font-medium">Calculateur</span> - Captures d'écran du calculateur</li>
                    <li><span className="font-medium">Témoignages</span> - Photos de profil des témoins</li>
                    <li><span className="font-medium">Plateformes</span> - Images des appareils</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#77BFA3]">Texte alternatif</h4>
                  <p className="mt-2">Pour les témoignages, utilisez la convention "testimonial-X" où X est le numéro du témoignage (1 à 8).</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#77BFA3]">Dimensions</h4>
                  <p className="mt-2">Recommandations pour chaque section :</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Hero: 1600x900px</li>
                    <li>Fonctionnalités: 800x600px</li>
                    <li>Calculateur: 800x600px</li>
                    <li>Témoignages: 200x200px (carré)</li>
                    <li>Plateformes: 600x400px</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="p-4 border rounded-lg bg-slate-700 border-slate-600">
              <h2 className="text-xl font-montserrat font-medium mb-4">Images téléchargées</h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p>Chargement des images...</p>
                </div>
              ) : assets.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-40 text-[#F5E9D7]/60">
                  <ImageIcon className="w-12 h-12 mb-4" />
                  <p>Aucune image téléchargée</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map(asset => (
                    <div key={asset.id} className="relative border rounded-lg overflow-hidden bg-slate-800 border-slate-600">
                      <div className="h-40 overflow-hidden">
                        {asset.url ? (
                          <img 
                            src={asset.url} 
                            alt={asset.alt_text} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex justify-center items-center h-full bg-slate-700">
                            <ImageIcon className="w-8 h-8 text-slate-500" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="inline-block px-2 py-1 text-xs rounded bg-[#77BFA3]/20 text-[#77BFA3] mb-2">
                              {asset.section}
                            </span>
                            <p className="text-sm truncate" title={asset.alt_text}>
                              {asset.alt_text}
                            </p>
                            {asset.dimensions && (
                              <p className="text-xs text-[#F5E9D7]/60 mt-1">
                                {asset.dimensions}
                              </p>
                            )}
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-red-500/20 text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-800 border-slate-700 text-[#F5E9D7]">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription className="text-[#F5E9D7]/70">
                                  Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-slate-700 hover:bg-slate-600 text-[#F5E9D7]">
                                  Annuler
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => deleteAsset(asset)}
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
