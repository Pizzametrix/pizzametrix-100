
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Dupont",
    role: "Pizza Enthousiaste",
    content: "Grâce à Pizzametrix, j'ai enfin réussi à faire une pâte à pizza napolitaine parfaite. Les calculs précis font toute la différence !",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Chef Amateur",
    content: "Je cherchais depuis longtemps un outil qui me permette de calculer précisément mes ingrédients. Pizzametrix est exactement ce qu'il me fallait !",
    rating: 5,
  },
  {
    id: 3,
    name: "Julie Leroy",
    role: "Blogueuse Culinaire",
    content: "L'application est intuitive et les résultats sont au rendez-vous. Je recommande Pizzametrix à tous mes lecteurs passionnés de pizza.",
    rating: 4,
  },
  {
    id: 4,
    name: "Marc Dubois",
    role: "Propriétaire de Pizzeria",
    content: "Même en tant que professionnel, j'utilise Pizzametrix pour tester de nouvelles recettes. Un outil remarquable qui a sa place dans toutes les cuisines.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#F5E9D7] text-3xl font-montserrat font-bold text-center mb-12">
          Ce que disent nos utilisateurs
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="bg-slate-700 p-6 rounded-lg h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-[#C53030] fill-[#C53030]"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[#F5E9D7]/80 italic mb-4 flex-grow">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <p className="text-[#F5E9D7] font-semibold">{testimonial.name}</p>
                    <p className="text-[#77BFA3] text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static mr-2 bg-[#C53030]/10 hover:bg-[#C53030]/20 border-[#C53030]/20" />
            <CarouselNext className="relative static ml-2 bg-[#C53030]/10 hover:bg-[#C53030]/20 border-[#C53030]/20" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
