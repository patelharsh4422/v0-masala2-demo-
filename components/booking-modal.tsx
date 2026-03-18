"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Users, CheckCircle, Loader2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    guests: "2",
    reservation_date: "",
    reservation_time: "",
    special_requests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const { error: dbError } = await supabase.from("reservations").insert({
        customer_name: formData.customer_name,
        phone: formData.phone,
        guests: parseInt(formData.guests),
        reservation_date: formData.reservation_date,
        reservation_time: formData.reservation_time,
        special_requests: formData.special_requests || null,
      });

      if (dbError) {
        throw dbError;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to submit reservation. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    setFormData({
      customer_name: "",
      phone: "",
      guests: "2",
      reservation_date: "",
      reservation_time: "",
      special_requests: "",
    });
    onClose();
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">
            {isSuccess ? "Reservation Confirmed!" : "Book a Table"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isSuccess
              ? "We look forward to serving you at Magic Masala."
              : "Reserve your table for an unforgettable dining experience."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              Thank you, {formData.customer_name}!
            </h3>
            <p className="text-muted-foreground mb-4">
              Your table for {formData.guests} guests is reserved for{" "}
              {new Date(formData.reservation_date).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {formData.reservation_time}.
            </p>
            <p className="text-sm text-muted-foreground">
              A confirmation will be sent to your phone: {formData.phone}
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="grid gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.customer_name}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_name: e.target.value })
                  }
                  required
                  className="bg-background border-border"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-background border-border"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-foreground">
                  Number of Guests *
                </Label>
                <Select
                  value={formData.guests}
                  onValueChange={(value) =>
                    setFormData({ ...formData, guests: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">10+ (Call for arrangements)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">
                    Date *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={formData.reservation_date}
                      onChange={(e) =>
                        setFormData({ ...formData, reservation_date: e.target.value })
                      }
                      required
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-foreground">
                    Time *
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      min="11:00"
                      max="22:30"
                      value={formData.reservation_time}
                      onChange={(e) =>
                        setFormData({ ...formData, reservation_time: e.target.value })
                      }
                      required
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="requests" className="text-foreground">
                  Special Requests
                </Label>
                <Textarea
                  id="requests"
                  placeholder="Any dietary restrictions, special occasions, seating preferences..."
                  value={formData.special_requests}
                  onChange={(e) =>
                    setFormData({ ...formData, special_requests: e.target.value })
                  }
                  className="bg-background border-border min-h-[80px]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
