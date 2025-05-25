"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Star } from "lucide-react"
import "../styles/subscribe.css"
import { useNavigate } from 'react-router-dom';

export default function Subscription() {

  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for getting started",
      price: "Free",
      period: "1 Year",
      icon: Star,
      popular: false,
      features: [
        "Basic API access",
        "1,000 requests/month",
        "Community support",
        "Basic documentation",
        "Email notifications",
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" ,
    },
    {
      id: "developer",
      name: "Developer",
      description: "For professional developers",
      price: "$99",
      period: "1 Year Plan",
      icon: Zap,
      popular: true,
      features: [
        "Full API access",
        "50,000 requests/month",
        "Priority support",
        "Advanced documentation",
        "Real-time monitoring",
        "Custom integrations",
        "Analytics dashboard",
      ],
      buttonText: "Start Development",
      buttonVariant: "default" ,
    },
    {
      id: "business",
      name: "Business",
      description: "Enterprise-grade solution",
      price: "$499",
      period: "Lifetime Access",
      icon: Crown,
      popular: false,
      features: [
        "Unlimited API access",
        "Unlimited requests",
        "24/7 dedicated support",
        "White-label solution",
        "Custom SLA",
        "Advanced analytics",
        "Multi-region deployment",
        "Priority feature requests",
      ],
      buttonText: "Go Enterprise",
      buttonVariant: "outline" ,
    },
  ]
  const userId = localStorage.getItem("userId");
  console.log(userId,'user id sub');
  const  navigate = useNavigate();
  const handleSubscribe = async (plan) => {
  try {
   // const userId = localStorage.getItem("user_id"); // Or get it from context/state
  //  if (!userId) return alert("User not logged in");

    const res = await fetch("https://guardians-of-comment-7g14.vercel.app/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        plan: plan.name,
        amount: plan.price.replace("$", "").replace("Free", "0"),
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Subscription successful!");
      localStorage.setItem("plane", plan.name);

      navigate('/Core');

    } else {
      alert(result.message || "Subscription failed");
    }
  } catch (error) {
    console.error("Subscription error:", error);
    alert("Something went wrong");
  }
};


  return (
    <div className="sub_con">
      <div className="full-width">

        {/* Header Section     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
*/}
        <div className="text-center mb-16 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select the perfect subscription plan for your needs. From free starter to enterprise solutions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const isHovered = hoveredCard === plan.id

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-500 ease-out transform hover:scale-105 ${
                  plan.popular
                    ? "border-2 border-primary shadow-2xl shadow-primary/20"
                    : "border border-slate-200 dark:border-slate-700 hover:border-primary/50"
                } ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <div
                    className={`mx-auto mb-4 p-3 rounded-full transition-all duration-300 ${
                      plan.popular
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    } ${isHovered ? "scale-110" : ""}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span
                        className={`text-4xl font-bold ${
                          plan.popular ? "text-primary" : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{plan.period}</p>
                  </div>
                </CardHeader>

                <CardContent className="px-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm transition-all duration-300"
                        style={{
                          animationDelay: `${index * 200 + featureIndex * 100}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <Check
                          className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-primary" : "text-green-500"}`}
                        />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-4">
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full transition-all duration-300 ${
                      plan.popular ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl" : ""
                    } ${isHovered ? "scale-105" : ""}`}
                    size="lg"
                      onClick={() => handleSubscribe(plan)}

                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 animate-in fade-in duration-1000 delay-1000">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            All plans include our core API features and regular updates
          </p>
          <div className="flex justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <span>✓ 99.9% Uptime SLA</span>
            <span>✓ Secure & Compliant</span>
            <span>✓ Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
