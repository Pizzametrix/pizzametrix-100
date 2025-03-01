
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { getLandingAssetsBySection, LazyImage } from "@/services/landingAssetsService";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Dupont",
    role: "Pizza Enthousiaste",
    content: "Grâce à Pizzametrix, j'ai enfin réussi à faire une pâte à pizza napolitaine parfaite. Les calculs précis font toute la différence !",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Chef Amateur",
    content: "Je cherchais depuis longtemps un outil qui me permette de calculer précisément mes ingrédients. Pizzametrix est exactement ce qu'il me fallait !",
    rating: 5
  },
  {
    id: 3,
    name: "Julie Leroy",
    role: "Blogueuse Culinaire",
    content: "L'application est intuitive et les résultats sont au rendez-vous. Je recommande Pizzametrix à tous mes lecteurs passionnés de pizza.",
    rating: 4
  },
  {
    id: 4,
    name: "Marc Dubois",
    role: "Propriétaire de Pizzeria",
    content: "Même en tant que professionnel, j'utilise Pizzametrix pour tester de nouvelles recettes. Un outil remarquable qui a sa place dans toutes les cuisines.",
    rating: 5
  },
  {
    id: 5,
    name: "Emma Rousseau",
    role: "Chef à Domicile",
    content: "Depuis que j'utilise Pizzametrix, mes clients sont impressionnés par la qualité de mes pizzas. La précision des calculs est incomparable.",
    rating: 5
  },
  {
    id: 6,
    name: "Lucas Bernard",
    role: "Étudiant en Cuisine",
    content: "Simple, efficace et précis. Pizzametrix m'aide à comprendre les fondamentaux de la pâte à pizza tout en m'offrant des résultats professionnels.",
    rating: 4
  },
  {
    id: 7,
    name: "Camille Morel",
    role: "Influenceuse Food",
    content: "J'ai testé plusieurs calculateurs, mais Pizzametrix est le seul qui m'a donné des résultats constants et fiables. Mes abonnés adorent mes nouvelles recettes!",
    rating: 5
  },
  {
    id: 8,
    name: "Antoine Lambert",
    role: "Boulanger-Pâtissier",
    content: "En tant que professionnel du métier, je suis impressionné par la précision et la flexibilité de Pizzametrix. Un indispensable pour toute cuisine sérieuse.",
    rating: 5
  }
];

export const Testimonials = () => {
  const [testimonialImages, setTestimonialImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonialImages = async () => {
      try {
        const assets = await getLandingAssetsBySection('testimonials');
        const imageMap: Record<string, string> = {};
        
        assets.forEach(asset => {
          const testimonialId = asset.alt_text.split('-')[1];
          if (testimonialId) {
            imageMap[testimonialId] = asset.url || '';
          }
        });
        
        setTestimonialImages(imageMap);
      } catch (error) {
        console.error("Erreur lors du chargement des images de témoignages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonialImages();
  }, []);

  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          Ce que disent nos utilisateurs
        </h2>
        
        <Carousel 
          opts={{
            align: "start",
            loop: true
          }} 
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {testimonials.map(testimonial => (
              <CarouselItem key={testimonial.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="bg-slate-700/90 p-6 rounded-lg h-full flex flex-col shadow-lg border border-slate-600 mx-[10px]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-[#C53030] fill-[#C53030]" : "text-gray-400"}`} 
                        />
                      ))}
                    </div>
                    {testimonialImages[testimonial.id.toString()] ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <LazyImage 
                          src={testimonialImages[testimonial.id.toString()]} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center">
                        <User className="text-[#F5E9D7] w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <p className="text-[#F5E9D7]/90 italic mb-4 flex-grow">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <p className="text-[#F5E9D7] font-semibold">{testimonial.name}</p>
                    <p className="text-[#77BFA3] text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative static bg-[#C53030] hover:bg-[#C53030]/80 border-none shadow-md text-[#F5E9D7] h-10 w-10 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="relative static bg-[#C53030] hover:bg-[#C53030]/80 border-none shadow-md text-[#F5E9D7] h-10 w-10 rounded-full">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
