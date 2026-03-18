"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Lock, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
}

export function PaymentModal({ isOpen, onClose, amount = 0 }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setCardData({ number: "", name: "", expiry: "", cvv: "" });
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">
            {isSuccess ? "Payment Successful!" : "Checkout"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isSuccess
              ? "Your order has been placed successfully."
              : "Complete your payment securely."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              Thank you for your order!
            </h3>
            <p className="text-muted-foreground mb-4">
              Your payment of ₹{amount.toLocaleString("en-IN")} has been processed.
            </p>
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation shortly.
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Summary */}
            {amount > 0 && (
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary">
                <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Smartphone className="w-4 h-4 mr-2" />
                  UPI
                </TabsTrigger>
              </TabsList>

              {/* Card Payment */}
              <TabsContent value="card" className="mt-6">
                <form onSubmit={handleCardPayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-foreground">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          number: formatCardNumber(e.target.value),
                        })
                      }
                      maxLength={19}
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-foreground">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardData.name}
                      onChange={(e) =>
                        setCardData({ ...cardData, name: e.target.value })
                      }
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-foreground">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-foreground">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="***"
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        maxLength={4}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay ₹{amount.toLocaleString("en-IN")}
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* UPI Payment */}
              <TabsContent value="upi" className="mt-6">
                <div className="text-center space-y-6">
                  <p className="text-muted-foreground">
                    Scan the QR code with any UPI app to pay
                  </p>
                  
                  {/* QR Code Placeholder */}
                  <div className="mx-auto w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
                    <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center">
                      <Smartphone className="w-12 h-12 text-muted-foreground/50 mb-2" />
                      <p className="text-xs text-muted-foreground/50 text-center px-2">
                        UPI QR Code
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Or pay using UPI ID</p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="px-4 py-2 bg-secondary rounded-lg text-foreground font-mono">
                        magicmasala@upi
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText("magicmasala@upi")}
                        className="border-border"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    After payment, your order will be confirmed automatically.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Secured with 256-bit SSL encryption</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
