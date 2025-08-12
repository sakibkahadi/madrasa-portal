"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Infinity } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const SubscriptionComponent = () => {
  // Current subscription is yearly (as dummy data)
  const [currentSubscription, setCurrentSubscription] = useState('yearly');
  const [selectedSubscription, setSelectedSubscription] = useState('yearly');

  const handleSubscriptionSelect = (value) => {
    setSelectedSubscription(value);
  };

  const handleChangeSubscription = () => {
    setCurrentSubscription(selectedSubscription);
    // Here you would typically make an API call to update the subscription
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Subscription Plans</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Yearly Subscription Card */}
        <div className="relative">
          <Card 
            onClick={() => handleSubscriptionSelect('yearly')}
            className={`h-full cursor-pointer border-2 ${
              selectedSubscription === 'yearly' ? 'border-primary' : 'border-border'
            } ${
              currentSubscription === 'yearly' ? 'bg-primary/5' : ''
            }`}
          >
            {currentSubscription === 'yearly' && (
              <Badge className="absolute top-4 right-4 bg-primary text-white">
                Current Plan
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Yearly Plan
              </CardTitle>
              <CardDescription>Best value for regular users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Full access to all features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Regular updates</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Lifetime Subscription Card */}
        <div className="relative">
          <Card 
            onClick={() => handleSubscriptionSelect('lifetime')}
            className={`h-full cursor-pointer border-2 ${
              selectedSubscription === 'lifetime' ? 'border-primary' : 'border-border'
            } ${
              currentSubscription === 'lifetime' ? 'bg-primary/5' : ''
            }`}
          >
            {currentSubscription === 'lifetime' && (
              <Badge className="absolute top-4 right-4 bg-primary text-white">
                Current Plan
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Infinity className="h-5 w-5" />
                Lifetime Access
              </CardTitle>
              <CardDescription>One-time payment, forever access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">$299</span>
                <span className="text-muted-foreground">/lifetime</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>All features from yearly plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Never pay again</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Lifetime updates and support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleChangeSubscription}
          disabled={currentSubscription === selectedSubscription}
        >
          Change Subscription
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionComponent;
