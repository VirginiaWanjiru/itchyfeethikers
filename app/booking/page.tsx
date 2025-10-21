// app/booking/page.tsx
"use client";

import React, { useState, useEffect, useRef, type ChangeEvent } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import MinimalHero from "@/components/shared/MinimalHero";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Users,
  MapPin,
  Clock,
  Mountain,
  Shield,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Mail,
  Download
} from "lucide-react";

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

const bookingSteps: BookingStep[] = [
  { id: 1, title: "Trip Details", description: "Select your adventure" },
  { id: 2, title: "Participant Info", description: "Tell us about your group" },
  { id: 3, title: "Payment", description: "Secure payment processing" },
  { id: 4, title: "Confirmation", description: "Your booking is confirmed" }
];

const selectedHike = {
  name: "Mount Kenya Summit Trek",
  difficulty: "Challenging",
  duration: "5 Days, 4 Nights",
  groupSize: "Max 12 People",
  location: "Central Kenya Highlands",
  price: 850,
  image: "/public/logo.png"
};

const Booking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [paymentType, setPaymentType] = useState<'full' | 'deposit'>('full');
  const [participantCount, setParticipantCount] = useState<number>(1);
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepperChildren = stepperRef.current?.children;
      if (stepperChildren && stepperChildren.length > 0) {
        gsap.fromTo(
          stepperChildren,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3
          }
        );
      }
    });

    return () => ctx.revert();
  }, [currentStep]);

  const totalPrice = selectedHike.price * participantCount;
  const depositAmount = Math.round(totalPrice * 0.3);
  const finalAmount = paymentType === 'full' ? totalPrice : depositAmount;

const nextStep = () => {
  console.log("nextStep called — currentStep:", currentStep);
  if (currentStep < 4) {
    setCurrentStep(prev => {
      console.log("updating step", prev + 1);
      return prev + 1;
    });
  }
};


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        <MinimalHero
          badge="Secure Booking"
          subtitle="Reserve Your Adventure"
          title="Booking & Payment"
          description="Quick and secure booking process with flexible payment options including M-Pesa integration. Your dream hiking adventure is just a few steps away."
          primaryCTA={{
            text: "Start Booking Process",
            action: () => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
          }}
          trustElement={{
            type: 'feature',
            value: 'SSL Secured',
            label: 'Payment Processing'
          }}
          backgroundImage={selectedHike.image}
          theme="light"
        />

        {/* Booking Process */}
        <section id="booking-form" className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            {/* Progress Stepper */}
            <div ref={stepperRef} className="mb-12">
              <div className="flex items-center justify-center">
                {bookingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all ${
                          currentStep >= step.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="text-center mt-2">
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.description}</div>
                      </div>
                    </div>
                    {index < bookingSteps.length - 1 && (
                      <div
                        className={`h-px w-24 mx-4 transition-all ${
                          currentStep > step.id ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trip Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-medium sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mountain className="h-5 w-5" />
                      Trip Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img src={selectedHike.image} alt={selectedHike.name} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">{selectedHike.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-destructive text-white">{selectedHike.difficulty}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {selectedHike.duration}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {selectedHike.groupSize}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {selectedHike.location}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Price per person:</span>
                        <span>${selectedHike.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Participants:</span>
                        <span>{participantCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${totalPrice}</span>
                      </div>
                      {paymentType === 'deposit' && (
                        <div className="flex justify-between text-sm text-accent">
                          <span>Deposit (30%):</span>
                          <span>${depositAmount}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total {paymentType === 'deposit' ? 'Deposit' : 'Amount'}:</span>
                        <span className="text-lg">${finalAmount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div ref={contentRef} className="lg:col-span-2">
                <Card className="shadow-soft">
                  <CardContent className="p-8">
                    {/* Step 1: Trip Details */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-display font-bold mb-2">Select Trip Details</h2>
                          <p className="text-muted-foreground">Choose your preferred dates and group size</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="start-date">Preferred Start Date</Label>
                            <Input type="date" id="start-date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="participants">Number of Participants</Label>
                            <Input
                              type="number"
                              id="participants"
                              min={1}
                              max={12}
                              value={participantCount}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const v = Math.max(1, parseInt(e.target.value, 10) || 1);
                                setParticipantCount(v);
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="special-requests">Special Requests or Dietary Requirements</Label>
                          <Textarea
                            id="special-requests"
                            placeholder="Tell us about any dietary restrictions, medical conditions, or special requests..."
                            rows={4}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Participant Info */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-display font-bold mb-2">Participant Information</h2>
                          <p className="text-muted-foreground">Provide details for all participants</p>
                        </div>

                        {[...Array(participantCount)].map((_, index) => (
                          <Card key={index} className="p-6 bg-muted/50">
                            <h3 className="font-semibold mb-4">Participant {index + 1}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input placeholder="Enter first name" />
                              </div>
                              <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Enter last name" />
                              </div>
                              <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input type="email" placeholder="Enter email" />
                              </div>
                              <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input placeholder="Enter phone number" />
                              </div>
                              <div className="space-y-2">
                                <Label>Date of Birth</Label>
                                <Input type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label>Emergency Contact</Label>
                                <Input placeholder="Name and phone number" />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-display font-bold mb-2">Payment Options</h2>
                          <p className="text-muted-foreground">Choose your payment method and amount</p>
                        </div>

                        {/* Payment Type Selection */}
                        <Tabs
                          value={paymentType}
                          onValueChange={(value: string) => setPaymentType(value as 'full' | 'deposit')}
                        >
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="full">Full Payment</TabsTrigger>
                            <TabsTrigger value="deposit">Deposit (30%)</TabsTrigger>
                          </TabsList>

                          <TabsContent value="full" className="space-y-4">
                            <Card className="p-4 bg-green-50 border-green-200">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                  <h4 className="font-medium">Full Payment</h4>
                                  <p className="text-sm text-green-700">Pay the complete amount now. No additional payments required.</p>
                                </div>
                              </div>
                            </Card>
                          </TabsContent>

                          <TabsContent value="deposit" className="space-y-4">
                            <Card className="p-4 bg-blue-50 border-blue-200">
                              <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-blue-600" />
                                <div>
                                  <h4 className="font-medium">Deposit Payment</h4>
                                  <p className="text-sm text-blue-700">Pay 30% now, remainder due 14 days before departure.</p>
                                </div>
                              </div>
                            </Card>
                          </TabsContent>
                        </Tabs>

                        {/* Payment Methods */}
                        <div className="space-y-4">
                          <h3 className="font-semibold">Payment Methods</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-4 cursor-pointer hover:shadow-medium transition-shadow border-primary">
                              <div className="flex items-center gap-3">
                                <CreditCard className="h-6 w-6 text-primary" />
                                <div>
                                  <h4 className="font-medium">Credit/Debit Card</h4>
                                  <p className="text-sm text-muted-foreground">Secure international payment</p>
                                </div>
                              </div>
                            </Card>

                            <Card className="p-4 cursor-pointer hover:shadow-medium transition-shadow">
                              <div className="flex items-center gap-3">
                                <Smartphone className="h-6 w-6 text-green-600" />
                                <div>
                                  <h4 className="font-medium">M-Pesa</h4>
                                  <p className="text-sm text-muted-foreground">Pay via mobile money</p>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </div>

                        {/* Card Payment Form */}
                        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium">Card Details</h4>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label>Card Number</Label>
                              <Input placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="col-span-2 space-y-2">
                                <Label>Expiry Date</Label>
                                <Input placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label>CVV</Label>
                                <Input placeholder="123" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Cardholder Name</Label>
                              <Input placeholder="Full name on card" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Confirmation */}
                    {currentStep === 4 && (
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>

                        <div>
                          <h2 className="text-2xl font-display font-bold mb-2">Booking Confirmed!</h2>
                          <p className="text-muted-foreground">Your adventure is booked. Check your email for confirmation details.</p>
                        </div>

                        <Card className="p-6 bg-muted/50 text-left max-w-md mx-auto">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="font-medium">Booking ID:</span>
                              <span className="font-mono">KP-2024-001</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Trip:</span>
                              <span>{selectedHike.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Participants:</span>
                              <span>{participantCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Amount Paid:</span>
                              <span className="font-semibold text-green-600">${finalAmount}</span>
                            </div>
                          </div>
                        </Card>

                        <div className="flex items-center justify-center gap-4">
                          <Button className="gap-2">
                            <QrCode className="h-4 w-4" />
                            Show QR Code
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Resend Email
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>

                        <Card className="p-4 bg-yellow-50 border-yellow-200 text-left">
                          <h4 className="font-medium mb-2">Refund Policy</h4>
                          <p className="text-sm text-yellow-800">
                            Full refund available up to 30 days before departure. 
                            50% refund 14-30 days before. No refund within 14 days.
                          </p>
                          <Button variant="outline" size="sm" className="mt-3">
                            Request Refund
                          </Button>
                        </Card>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 4 && (
                      <div className="flex justify-between pt-8 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 1}
                          className="gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button onClick={nextStep} className="gap-2">
                          {currentStep === 3 ? 'Complete Payment' : 'Continue'}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Booking;
