
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "@/components/ImageUpload";
import { supabase } from "@/integrations/supabase/client";

export default function Calculators() {
  const navigate = useNavigate();
  const bucketName = "pizza-images";
  
  const getImageUrl = (path: string) => {
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);
    return publicUrl;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
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
                <img 
                  src={getImageUrl("napolitaine.jpg")} 
                  alt="Pizza Napolitaine" 
                  className="w-full h-48 object-cover rounded-md"
                />
                <ImageUpload 
                  bucketName={bucketName}
                  imagePath="napolitaine.jpg"
                  onUploadComplete={() => {}}
                />
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
                <img 
                  src={getImageUrl("teglia.jpg")} 
                  alt="Pizza Teglia" 
                  className="w-full h-48 object-cover rounded-md"
                />
                <ImageUpload 
                  bucketName={bucketName}
                  imagePath="teglia.jpg"
                  onUploadComplete={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
