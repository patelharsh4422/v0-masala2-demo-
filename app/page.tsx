"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu-section";
import { BanquetsSection } from "@/components/banquets-section";
import { DeliverySection } from "@/components/delivery-section";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { OrderModal } from "@/components/order-modal";
import { PaymentModal } from "@/components/payment-modal";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handleOrderOpen = () => {
    setIsOrderOpen(true);
  };

  const handleCheckout = (amount: number) => {
    setPaymentAmount(amount);
    setIsPaymentOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar onBookTable={() => setIsBookingOpen(true)} />
      
      <Hero
        onBookTable={() => setIsBookingOpen(true)}
        onOrderOnline={handleOrderOpen}
      />
      
      <MenuSection />
      
      <BanquetsSection onEnquire={() => setIsBookingOpen(true)} />
      
      <DeliverySection />
      
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={paymentAmount}
      />
    </main>
  );
}
