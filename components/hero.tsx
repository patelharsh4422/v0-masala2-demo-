"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  onBookTable: () => void;
  onOrderOnline: () => void;
}

export function Hero({ onBookTable, onOrderOnline }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-food.jpg"
          alt="Luxurious Indian cuisine at Magic Masala"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block text-primary font-serif text-lg tracking-widest uppercase mb-4">
            Welcome to
          </span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          <span className="text-primary">A Magic Masala</span>
          <br />
          <span className="text-foreground text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide">
            Restaurant & Banquets
          </span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience the finest Indian cuisine crafted with passion and tradition. 
          From intimate dinners to grand celebrations, we create unforgettable moments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onBookTable}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg"
          >
            Book a Table
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onOrderOnline}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg"
          >
            Order Online
          </Button>
        </div>

        <div className="mt-12 text-muted-foreground">
          <p className="text-sm mb-2">Vastral, Ahmedabad</p>
          <p className="text-xs">Open Daily: 11:00 AM - 11:00 PM</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
}
