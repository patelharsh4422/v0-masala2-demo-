"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (amount: number) => void;
}

const menuItems = [
  { id: 1, name: "Paneer Tikka", price: 280, category: "Starters", image: "/images/starters.jpg" },
  { id: 2, name: "Chicken Malai Kebab", price: 320, category: "Starters", image: "/images/starters.jpg" },
  { id: 3, name: "Vegetable Samosa (2 pcs)", price: 120, category: "Starters", image: "/images/starters.jpg" },
  { id: 4, name: "Butter Chicken", price: 380, category: "Main Course", image: "/images/main-course.jpg" },
  { id: 5, name: "Dal Makhani", price: 280, category: "Main Course", image: "/images/main-course.jpg" },
  { id: 6, name: "Paneer Butter Masala", price: 320, category: "Main Course", image: "/images/main-course.jpg" },
  { id: 7, name: "Chicken Biryani", price: 380, category: "Main Course", image: "/images/main-course.jpg" },
  { id: 8, name: "Vegetable Biryani", price: 320, category: "Main Course", image: "/images/main-course.jpg" },
  { id: 9, name: "Butter Naan (2 pcs)", price: 80, category: "Breads", image: "/images/main-course.jpg" },
  { id: 10, name: "Gulab Jamun (2 pcs)", price: 120, category: "Desserts", image: "/images/desserts.jpg" },
  { id: 11, name: "Rasmalai (2 pcs)", price: 150, category: "Desserts", image: "/images/desserts.jpg" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function OrderModal({ isOpen, onClose, onCheckout }: OrderModalProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: typeof menuItems[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: number) => {
    return cart.find((i) => i.id === itemId)?.quantity || 0;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onCheckout(cartTotal);
    setCart([]);
    onClose();
  };

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col bg-card border-border p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-serif text-2xl text-foreground">
            Order Online
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select items to add to your cart. Free delivery within 5km of Vastral.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-8 py-4">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4 sticky top-0 bg-card py-2">
                  {category}
                </h3>
                <div className="space-y-3">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const quantity = getItemQuantity(item.id);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border"
                        >
                          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {item.name}
                            </h4>
                            <p className="text-primary font-semibold">
                              ₹{item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {quantity > 0 ? (
                              <div className="flex items-center gap-2 bg-primary rounded-lg">
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-primary-foreground hover:bg-primary/80 rounded-l-lg"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center text-primary-foreground font-medium">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="p-2 text-primary-foreground hover:bg-primary/80 rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => addToCart(item)}
                                className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 bg-secondary/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">
                  {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={() => setCart([])}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear cart
              </button>
            </div>

            {/* Cart Items Preview */}
            <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-muted-foreground">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4 pt-2 border-t border-border">
              <span className="font-serif text-lg font-semibold text-foreground">
                Total
              </span>
              <span className="font-serif text-xl font-bold text-primary">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
