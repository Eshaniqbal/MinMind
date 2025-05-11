"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code2, Smartphone, BarChart, Palette, Bot } from "lucide-react";
import { Service } from "@/lib/types";
import Link from "next/link";

interface ServiceSliderProps {
  services: Service[];
}

const iconComponents = {
  'Code2': Code2,
  'Smartphone': Smartphone,
  'BarChart': BarChart,
  'Palette': Palette,
  'Bot': Bot,
} as const;

export function ServiceSlider({ services }: ServiceSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className="relative w-full px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {services.map((service) => {
            const IconComponent = iconComponents[service.iconName as keyof typeof iconComponents];
            return (
              <div 
                key={service.id} 
                className="flex-[0_0_100%] min-w-[280px] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <Card className="h-full bg-card hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="items-center text-center">
                    {IconComponent && (
                      <div className="w-16 h-16 flex items-center justify-center mb-4">
                        <IconComponent className="h-12 w-12 text-primary" />
                      </div>
                    )}
                    <CardTitle className="text-2xl font-bold text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <p className="text-base text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                      <Link href="/quote">
                        Request This Service
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
        onClick={scrollPrev}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
        onClick={scrollNext}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 