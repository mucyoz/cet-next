"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation"; // 1. Import the router hook

// 2. The props are now simpler and don't include onSelect or disabled
interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: Array<{ text: string; tooltip?: string }>;
  popular?: boolean;
  color: "blue" | "indigo" | "amber" | "purple";
}

export function PricingCard({
  title,
  price,
  description,
  features,
  popular = false,
  color,
}: PricingCardProps) {
  const router = useRouter(); // 3. Initialize the router

  const colorClasses = {
    blue: {
      badge: "bg-blue-100 text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700",
      check: "text-blue-500",
      shadow: popular ? "shadow-xl shadow-blue-100" : "shadow-md",
      border: popular ? "border-blue-200" : "",
    },
    indigo: {
      badge: "bg-indigo-100 text-indigo-800",
      button: "bg-indigo-600 hover:bg-indigo-700",
      check: "text-indigo-500",
      shadow: popular ? "shadow-xl shadow-indigo-100" : "shadow-md",
      border: popular ? "border-indigo-200" : "",
    },
    amber: {
      badge: "bg-amber-100 text-amber-800",
      button: "bg-amber-600 hover:bg-amber-700",
      check: "text-amber-500",
      shadow: popular ? "shadow-xl shadow-amber-100" : "shadow-md",
      border: popular ? "border-amber-200" : "",
    },
    purple: {
      badge: "bg-purple-100 text-purple-800",
      button: "bg-purple-600 hover:bg-purple-700",
      check: "text-purple-500",
      shadow: popular ? "shadow-xl shadow-purple-100" : "shadow-md",
      border: popular ? "border-purple-200" : "",
    },
  };

  // 4. Create an internal handler function for navigation
  const handleSelect = () => {
    router.push("/application");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden border-2 transition-all duration-300",
          colorClasses[color].border,
          colorClasses[color].shadow,
          popular ? "scale-105 transform" : ""
        )}
      >
        {popular && (
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32">
            <div
              className={cn(
                "absolute transform rotate-45 translate-y-8 sm:translate-y-12 -translate-x-4 sm:-translate-x-6 w-32 sm:w-40 text-center py-1 text-xs sm:text-sm font-medium",
                colorClasses[color].badge
              )}
            >
              Most Popular
            </div>
          </div>
        )}

        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h3 className="text-base sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed">
              {description}
            </p>
            <div className="flex items-baseline justify-center">
              <span className="text-2xl sm:text-3xl lg:text-5xl font-bold">
                ${price}
              </span>
              <span className="text-gray-500 ml-1 sm:ml-2 text-xs sm:text-sm">
                one-time
              </span>
            </div>
          </div>

          <Button
            // 5. Wire the button's onClick to the internal handler
            onClick={handleSelect}
            className={cn(
              "w-full py-3 sm:py-4 lg:py-6 text-xs sm:text-sm lg:text-lg text-white font-medium",
              "transition-all duration-300 mb-4 sm:mb-6 lg:mb-8",
              "rounded-lg shadow-sm",
              "transform hover:scale-[1.02] active:scale-[0.98]",
              colorClasses[color].button,
              "hover:shadow-md"
            )}
          >
            Apply Now & Get Started
          </Button>

          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <div className="h-px bg-gray-200" />
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Check
                  className={cn(
                    "h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5",
                    colorClasses[color].check
                  )}
                />
                <div className="flex items-start min-w-0 flex-1">
                  <span className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {feature.text}
                  </span>
                  {feature.tooltip && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="ml-1 sm:ml-1.5 flex-shrink-0">
                          <Info className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs sm:text-sm">
                            {feature.tooltip}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
