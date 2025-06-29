import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

interface NavigationProps {
  currentPage: 'home' | 'services' | 'howItWorks' | 'faq' | 'application' | 'employers';
  setCurrentPage: (page: 'home' | 'services' | 'howItWorks' | 'faq' | 'application' | 'employers') => void;
  onStart: () => void;
  showCTA?: boolean;
  showBackButton?: boolean;
}

export function Navigation({ currentPage, setCurrentPage, onStart, showCTA = true, showBackButton = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (page: 'home' | 'services' | 'howItWorks' | 'faq' | 'application' | 'employers') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationItems = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
    { key: 'howItWorks', label: 'How It Works' },
    { key: 'faq', label: 'FAQ' },
    { key: 'employers', label: 'For Orgs' },
  ] as const;

  return (
    <header className="bg-white/95 backdrop-blur-md py-3 sm:py-4 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Mobile Back Button (shows on non-home pages) */}
          {(showBackButton || currentPage !== 'home') && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="flex items-center text-gray-600 hover:text-gray-900 p-2 min-h-[44px] min-w-[44px]"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                <span className="text-xs sm:text-sm">Back</span>
              </Button>
            </div>
          )}

          {/* Logo - Always clickable to home */}
          <div className={cn(
            "flex items-center min-w-0",
            (showBackButton || currentPage !== 'home') ? "md:flex hidden" : "flex"
          )}>
            <Logo 
              size="md"
              onClick={() => handleNavClick('home')}
              className="focus:ring-offset-0"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
            {navigationItems.slice(1).map((item) => (
              <button 
                key={item.key}
                onClick={() => handleNavClick(item.key as any)}
                className={cn(
                  "font-medium hover-lift transition-colors duration-200 text-xs lg:text-sm xl:text-base whitespace-nowrap",
                  currentPage === item.key 
                    ? "text-blue-600 font-semibold" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {showCTA && currentPage === 'home' && (
              <Button 
                onClick={onStart}
                className="gradient-bg hover:opacity-90 text-white text-xs px-2 sm:px-3 py-2 min-h-[36px] whitespace-nowrap"
              >
                Start
              </Button>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>

          {/* Desktop CTA Button */}
          {showCTA && (
            <Button 
              onClick={onStart}
              className="hidden md:block gradient-bg hover:opacity-90 text-white text-xs lg:text-sm xl:text-base px-3 lg:px-4 xl:px-6 py-2 whitespace-nowrap"
            >
              <span className="hidden xl:inline">Start Your Evaluation</span>
              <span className="xl:hidden">Get Started</span>
            </Button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-3 sm:mt-4 border-t border-gray-200 pt-3 sm:pt-4 overflow-hidden bg-white rounded-lg shadow-lg"
            >
              <nav className="flex flex-col space-y-1 sm:space-y-2 p-2">
                {navigationItems.map((item) => (
                  <button 
                    key={item.key}
                    onClick={() => handleNavClick(item.key as any)}
                    className={cn(
                      "text-left font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 text-sm sm:text-base min-h-[44px] sm:min-h-[48px] flex items-center",
                      currentPage === item.key 
                        ? "text-blue-600 bg-blue-50 font-semibold border-l-4 border-blue-600" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile CTA in menu */}
                {showCTA && (
                  <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-2">
                    <Button 
                      onClick={() => {
                        onStart();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full gradient-bg hover:opacity-90 text-white py-2 sm:py-3 min-h-[44px] sm:min-h-[48px]"
                    >
                      Start Your Application
                    </Button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}