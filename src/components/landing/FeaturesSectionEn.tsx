
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getLandingAssetsBySection } from "@/services/landingAssetsService";
import type { LandingAsset } from "@/services/landingAssetsService";

export const FeaturesSection = () => {
  const [images, setImages] = useState<LandingAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const featuresImages = await getLandingAssetsBySection('features');
        setImages(featuresImages);
      } catch (error) {
        console.error("Error loading feature images:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // Fallback images in case no images are found in Supabase
  const fallbackImages = {
    napolitaine: "/napolitaine.jpg",
    teglia: "/teglia.jpg"
  };

  // Function to get image by position in the array, with fallback if necessary
  const getImageByPosition = (position: number, type: 'napolitaine' | 'teglia'): string => {
    const image = images.find(img => img.position === position);
    if (image && image.url) {
      return image.url;
    }
    return fallbackImages[type];
  };

  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          A Specialized Application for Each Pizza Style
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-700 border-[#F5E9D7] overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={getImageByPosition(0, 'napolitaine')} 
                alt="Authentic Neapolitan pizza with thin dough and characteristic puffy edges" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Neapolitan Pizza</h3>
              <p className="text-[#F5E9D7]/80 mb-4">
                Calculate the perfect ingredients for authentic Neapolitan dough, with the right balance of hydration and yeast.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700 border-[#F5E9D7] overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={getImageByPosition(1, 'teglia')} 
                alt="Roman Teglia pizza with its characteristic airy and crispy texture" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#F5E9D7] text-xl font-montserrat font-bold mb-2">Roman Teglia Pizza</h3>
              <p className="text-[#F5E9D7]/80 mb-4">
                Master the art of Roman pan pizza with our specialized calculator for this airy and crispy style of pizza.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
