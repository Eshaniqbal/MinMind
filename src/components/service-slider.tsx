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
    loop: false,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 2 },
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
            const IconComponent = iconComponents[service.iconName];
            return (
              <div 
                key={service.id} 
                className="flex-[0_0_100%] min-w-[260px] sm:min-w-[280px] lg:flex-[0_0_calc(50%-12px)]"
              >
                <Card className="h-[400px] bg-card hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="items-center text-center p-4 sm:p-6">
                    {IconComponent && (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                        <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                      </div>
                    )}
                    <CardTitle className="text-xl sm:text-2xl font-bold text-foreground line-clamp-1 px-2 sm:px-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center p-4 sm:p-6 pt-0">
                    <div className="flex flex-col items-center justify-between h-full">
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 line-clamp-4 min-h-[100px] px-2 sm:px-4">
                        {service.description}
                      </p>
                      <Button asChild variant="outline" size="sm" className="sm:size-lg border-primary text-primary hover:bg-primary/10 hover:text-primary">
                        <Link href="/quote">
                          Request This Service
                        </Link>
                      </Button>
                    </div>
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