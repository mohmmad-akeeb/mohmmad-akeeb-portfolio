'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NAV_ITEMS, ANIMATION_DURATION, ANIMATION_EASING } from '@/lib/constants';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { activeSection, scrollToSection } = useScrollSpy({
    sectionIds: NAV_ITEMS.map(item => item.id),
    offset: 80, // Account for sticky nav height
  });

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-navigation');
      const button = document.querySelector('[aria-label="Toggle navigation menu"]');
      
      if (nav && !nav.contains(event.target as Node) && 
          button && !button.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    // Close mobile menu first for better UX
    setIsMobileMenuOpen(false);
    
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: ANIMATION_DURATION.slow,
        ease: ANIMATION_EASING.easeOut,
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo/Brand */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => handleNavClick('home')}
              className="text-responsive-lg sm:text-responsive-xl font-bold text-foreground hover:text-primary transition-colors duration-200 touch-target"
              aria-label="Go to home section"
            >
              Mohmmad Akeeb
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    px-2 lg:px-3 py-2 rounded-md text-responsive-sm font-medium
                    transition-all duration-200 ease-out
                    relative overflow-hidden touch-target
                    ${activeSection === item.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to ${item.label.toLowerCase()} section`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeIndicator"
                      transition={{
                        duration: ANIMATION_DURATION.normal,
                        ease: ANIMATION_EASING.easeInOut,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className="
                  inline-flex items-center justify-center p-2 rounded-md
                  text-muted-foreground hover:text-foreground hover:bg-muted
                  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary
                  transition-colors duration-200 touch-target
                "
                whileTap={{ scale: 0.95 }}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                  {/* Hamburger Icon */}
                  <motion.span
                    className="absolute block h-0.5 w-full bg-current transform transition-all duration-300"
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 0 : -6,
                    }}
                  />
                  <motion.span
                    className="absolute block h-0.5 w-full bg-current transform transition-all duration-300"
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                    }}
                  />
                  <motion.span
                    className="absolute block h-0.5 w-full bg-current transform transition-all duration-300"
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? 0 : 6,
                    }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border shadow-xl z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: ANIMATION_DURATION.normal,
              ease: ANIMATION_EASING.easeInOut,
            }}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    block w-full text-left px-4 py-4 rounded-lg text-base font-medium
                    transition-all duration-200 ease-out touch-target
                    active:scale-95 active:bg-primary/20
                    ${activeSection === item.id
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: ANIMATION_DURATION.normal,
                    delay: index * 0.1,
                    ease: ANIMATION_EASING.easeOut,
                  }}
                  whileTap={{ scale: 0.98 }}
                  role="menuitem"
                  aria-label={`Go to ${item.label.toLowerCase()} section`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  type="button"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}