"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const menuCategories = [
  {
    id: "starters",
    name: "Starters",
    image: "/images/starters.jpg",
    items: [
      { name: "Paneer Tikka", price: 280, description: "Cottage cheese marinated in spices, grilled to perfection" },
      { name: "Chicken Malai Kebab", price: 320, description: "Creamy chicken kebabs with a touch of cardamom" },
      { name: "Vegetable Samosa", price: 120, description: "Crispy pastry filled with spiced potatoes and peas" },
      { name: "Tandoori Mushroom", price: 250, description: "Mushrooms marinated in tandoori spices" },
      { name: "Fish Amritsari", price: 380, description: "Crispy fried fish with Punjabi spices" },
      { name: "Hara Bhara Kebab", price: 220, description: "Spinach and green pea patties" },
    ],
  },
  {
    id: "main",
    name: "Main Course",
    image: "/images/main-course.jpg",
    items: [
      { name: "Butter Chicken", price: 380, description: "Tender chicken in rich tomato-butter gravy" },
      { name: "Dal Makhani", price: 280, description: "Black lentils slow-cooked overnight with cream" },
      { name: "Paneer Butter Masala", price: 320, description: "Cottage cheese in creamy tomato sauce" },
      { name: "Mutton Rogan Josh", price: 450, description: "Kashmiri-style lamb curry with aromatic spices" },
      { name: "Vegetable Biryani", price: 320, description: "Fragrant basmati rice with seasonal vegetables" },
      { name: "Chicken Biryani", price: 380, description: "Hyderabadi-style layered rice with chicken" },
      { name: "Palak Paneer", price: 300, description: "Cottage cheese in creamy spinach gravy" },
      { name: "Prawn Masala", price: 480, description: "Jumbo prawns in spicy coastal curry" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    image: "/images/desserts.jpg",
    items: [
      { name: "Gulab Jamun", price: 120, description: "Deep-fried milk dumplings in rose syrup" },
      { name: "Rasmalai", price: 150, description: "Soft cottage cheese patties in saffron milk" },
      { name: "Kulfi Falooda", price: 180, description: "Traditional Indian ice cream with vermicelli" },
      { name: "Gajar Ka Halwa", price: 160, description: "Warm carrot pudding with nuts" },
      { name: "Kheer", price: 140, description: "Creamy rice pudding with cardamom" },
    ],
  },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("starters");

  const currentCategory = menuCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="menu" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-serif text-lg tracking-widest uppercase">
            Our Specialties
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            Curated Menu
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Each dish is crafted with authentic recipes passed down through generations,
            using the finest ingredients and aromatic spices.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 bg-secondary rounded-lg">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-6 py-3 rounded-md font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Category Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={currentCategory?.image || "/images/starters.jpg"}
              alt={currentCategory?.name || "Menu"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="font-serif text-3xl font-bold text-foreground">
                {currentCategory?.name}
              </h3>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            {currentCategory?.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start gap-4 pb-6 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <h4 className="font-serif text-xl font-semibold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.description}
                  </p>
                </div>
                <span className="text-primary font-bold text-lg whitespace-nowrap">
                  ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
