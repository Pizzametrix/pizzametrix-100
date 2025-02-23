
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function Calculators() {
  const navigate = useNavigate();
  const bucketName = "pizza-images";
  const [napolitaineUrl, setNapolitaineUrl] = useState<string>("");
  const [tegliaUrl, setTegliaUrl] = useState<string>("");
  
  const getImageUrl = async (path: string) => {
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);
    return publicUrl;
  };

  useEffect(() => {
    const loadImages = async () => {
      const napoUrl = await getImageUrl("pizza-napolitaine-origine-1024x683.jpeg");
      const tegUrl = await getImageUrl("pizza-in-teglia-romana.jpg");
      setNapolitaineUrl(napoUrl);
      setTegliaUrl(tegUrl);
      console.log("URLs des images:", { napoUrl, tegUrl });
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-4 md:p-8 mt-16 md:mt-0">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-cream mb-8 text-center">
            Calculatrices
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="bg-slate border-cream/10 cursor-pointer transition-transform hover:scale-105"
              onClick={() => navigate('/calculators/napolitaine')}
            >
              <CardHeader>
                <CardTitle className="text-cream">Pizza Napolitaine</CardTitle>
                <CardDescription className="text-cream/80">
                  Calculez les proportions pour une authentique pizza napolitaine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {napolitaineUrl && (
                  <img 
                    src={napolitaineUrl} 
                    alt="Pizza Napolitaine" 
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>

            <Card 
              className="bg-slate border-cream/10 cursor-pointer transition-transform hover:scale-105"
              onClick={() => navigate('/calculators/teglia')}
            >
              <CardHeader>
                <CardTitle className="text-cream">Pizza Teglia</CardTitle>
                <CardDescription className="text-cream/80">
                  Calculez les proportions pour une délicieuse pizza teglia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tegliaUrl && (
                  <img 
                    src={tegliaUrl} 
                    alt="Pizza Teglia" 
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
