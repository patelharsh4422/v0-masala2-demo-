"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Truck, Clock, CheckCircle, XCircle } from "lucide-react";

const deliverableAreas = [
  "vastral",
  "odhav",
  "nikol",
  "naroda",
  "amraiwadi",
  "ramol",
  "vatva",
  "isanpur",
  "gomtipur",
  "saraspur",
  "bapunagar",
  "rakhial",
];

export function DeliverySection() {
  const [pincode, setPincode] = useState("");
  const [checkResult, setCheckResult] = useState<"available" | "unavailable" | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckDelivery = async () => {
    if (!pincode.trim()) return;
    
    setIsChecking(true);
    // Simulate API check
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const lowerPincode = pincode.toLowerCase().trim();
    const isDeliverable = 
      deliverableAreas.some((area) => lowerPincode.includes(area)) ||
      ["382418", "382415", "382425", "382424", "382405"].includes(lowerPincode);
    
    setCheckResult(isDeliverable ? "available" : "unavailable");
    setIsChecking(false);
  };

  return (
    <section id="delivery" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary font-serif text-lg tracking-widest uppercase">
              Home Delivery
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Taste Magic at Home
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Cannot make it to our restaurant? No worries! We bring the same authentic 
              flavors and premium quality right to your doorstep. Enjoy restaurant-quality 
              Indian cuisine in the comfort of your home.
            </p>

            {/* Delivery Info Cards */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Free Delivery</h4>
                  <p className="text-muted-foreground text-sm">Within 5km of Vastral</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Quick Delivery</h4>
                  <p className="text-muted-foreground text-sm">30-45 minutes estimated time</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Extended Coverage</h4>
                  <p className="text-muted-foreground text-sm">Nominal charges beyond 5km radius</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Delivery Check */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Check Delivery Availability
            </h3>
            <p className="text-muted-foreground mb-6">
              Enter your area name or pincode to check if we deliver to your location.
            </p>

            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter area or pincode (e.g., Vastral, 382418)"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                  setCheckResult(null);
                }}
                className="flex-1 bg-background border-border"
              />
              <Button
                onClick={handleCheckDelivery}
                disabled={isChecking || !pincode.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isChecking ? "Checking..." : "Check"}
              </Button>
            </div>

            {/* Result */}
            {checkResult && (
              <div
                className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                  checkResult === "available"
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                {checkResult === "available" ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-500">
                        Free Home Delivery Available!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your location is within our 5km delivery zone.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="font-semibold text-red-500">
                        Outside Free Delivery Zone
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Delivery available with nominal charges. Call us for details.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Deliverable Areas */}
            <div className="mt-8">
              <p className="text-sm font-medium text-foreground mb-3">
                Free Delivery Areas:
              </p>
              <div className="flex flex-wrap gap-2">
                {deliverableAreas.slice(0, 8).map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary capitalize"
                  >
                    {area}
                  </span>
                ))}
                <span className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                  +{deliverableAreas.length - 8} more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
