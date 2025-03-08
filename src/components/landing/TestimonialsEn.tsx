
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { getLandingAssetsBySection } from "@/services/landingAssetsService";

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
    role: "Pizza Enthusiast",
    content: "Thanks to Pizzametrix, I finally succeeded in making a perfect Neapolitan pizza dough. The precise calculations make all the difference!",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Amateur Chef",
    content: "I had been looking for a tool that would allow me to precisely calculate my ingredients. Pizzametrix is exactly what I needed!",
    rating: 5
  },
  {
    id: 3,
    name: "Julie Leroy",
    role: "Food Blogger",
    content: "The application is intuitive and the results are excellent. I recommend Pizzametrix to all my pizza-loving readers.",
    rating: 4
  },
  {
    id: 4,
    name: "Marc Dubois",
    role: "Pizzeria Owner",
    content: "Even as a professional, I use Pizzametrix to test new recipes. A remarkable tool that deserves a place in every kitchen.",
    rating: 5
  },
  {
    id: 5,
    name: "Emma Rousseau",
    role: "Private Chef",
    content: "Since I started using Pizzametrix, my clients have been impressed by the quality of my pizzas. The precision of the calculations is unmatched.",
    rating: 5
  },
  {
    id: 6,
    name: "Lucas Bernard",
    role: "Culinary Student",
    content: "Simple, effective and precise. Pizzametrix helps me understand the fundamentals of pizza dough while giving me professional results.",
    rating: 4
  },
  {
    id: 7,
    name: "Camille Morel",
    role: "Food Influencer",
    content: "I've tested several calculators, but Pizzametrix is the only one that has given me consistent and reliable results. My followers love my new recipes!",
    rating: 5
  },
  {
    id: 8,
    name: "Antoine Lambert",
    role: "Baker-Pastry Chef",
    content: "As a professional in the field, I'm impressed by the precision and flexibility of Pizzametrix. An essential for any serious kitchen.",
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
        console.error("Error loading testimonial images:", error);
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
          What our users say
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
                        <img 
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
