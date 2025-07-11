// src/components/shared/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navigationItems = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/for-orgs", label: "For Orgs" },
  { href: "/contact-us", label: "Contact Us" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // THE FIX IS HERE: Use a setTimeout to delay closing the menu
  const handleMobileLinkClick = () => {
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 150);
  };

  const handleStartApplication = () => {
    router.push("/application");
  };

  return (
    <header className="glassmorphism py-3 sm:py-4 sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" aria-label="Go to homepage">
              <Logo size="md" className="focus:ring-offset-0" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center font-medium hover-lift transition-colors duration-200 text-sm lg:text-base whitespace-nowrap",

                  item.href === "/contact-us"
                    ? "font-extrabold text-blue-600"
                    : pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={handleStartApplication}
              className="gradient-bg hover:opacity-90 text-white text-xs px-3 py-2 min-h-[36px] whitespace-nowrap"
            >
              Start
            </Button>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleStartApplication}
              className="gradient-bg hover:opacity-90 text-white text-sm md:text-base px-4 md:px-6 py-2 whitespace-nowrap"
            >
              Start Your Evaluation
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 border-t border-gray-200 pt-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleMobileLinkClick} // This now works correctly
                    className={cn(
                      "text-left font-medium py-3 px-4 rounded-lg transition-colors duration-200 min-h-[48px]",
                      pathname === item.href
                        ? "text-blue-600 bg-blue-50 font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
