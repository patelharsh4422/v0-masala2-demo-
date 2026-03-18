"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, Sparkles, Music, Utensils } from "lucide-react";

interface BanquetsSectionProps {
  onEnquire: () => void;
}

const features = [
  {
    icon: Users,
    title: "Capacity 50-500",
    description: "Multiple halls for intimate gatherings to grand celebrations",
  },
  {
    icon: Sparkles,
    title: "Premium Decor",
    description: "Elegant themes customized for your special occasion",
  },
  {
    icon: Music,
    title: "Entertainment",
    description: "DJ, live music, and sound system arrangements available",
  },
  {
    icon: Utensils,
    title: "Custom Menu",
    description: "Personalized menus crafted by our expert chefs",
  },
];

export function BanquetsSection({ onEnquire }: BanquetsSectionProps) {
  return (
    <section id="banquets" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-serif text-lg tracking-widest uppercase">
            Celebrate With Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            Banquet Halls
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From weddings to corporate events, our premium banquet facilities provide 
            the perfect backdrop for your most memorable moments.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/banquet-hall.jpg"
                alt="Magic Masala Banquet Hall"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-2xl border border-border max-w-xs hidden md:block">
              <p className="text-primary font-serif text-4xl font-bold">500+</p>
              <p className="text-muted-foreground">Events hosted successfully</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
              Perfect Venue for Every Occasion
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our state-of-the-art banquet facilities combine elegance with modern amenities. 
              Whether you are planning a dream wedding, a milestone birthday, or a corporate 
              conference, our dedicated team ensures every detail is perfect.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onEnquire}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Enquire Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href="tel:+919876543210">Call for Booking</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Event Types */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Weddings", "Receptions", "Corporate Events", "Birthday Parties"].map((event, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
            >
              <p className="font-serif text-lg font-semibold text-foreground">{event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
