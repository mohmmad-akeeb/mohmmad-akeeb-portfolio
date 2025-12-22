'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { KaggleIcon } from '@/components/icons';
import { SOCIAL_LINKS, ANIMATION_DURATION, ANIMATION_EASING } from '@/lib/constants';

// Icon mapping for social media
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  kaggle: KaggleIcon,
  twitter: Twitter,
  mail: Mail,
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto container-responsive py-6 sm:py-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Social Links */}
          <motion.div
            className="flex items-center space-x-3 sm:space-x-4 md:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: ANIMATION_DURATION.slow,
              ease: ANIMATION_EASING.easeOut,
            }}
          >
            {SOCIAL_LINKS.map((social, index) => {
              const IconComponent = iconMap[social.icon as keyof typeof iconMap];
              
              return (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-2.5 sm:p-3 rounded-full
                    text-muted-foreground hover:text-foreground
                    bg-muted/50 hover:bg-muted
                    transition-all duration-300 ease-out
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    focus:ring-offset-background touch-target
                  "
                  aria-label={`Visit ${social.label} profile`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: ANIMATION_DURATION.normal,
                    delay: index * 0.1,
                    ease: ANIMATION_EASING.easeOut,
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: ANIMATION_DURATION.fast }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: ANIMATION_DURATION.fast }
                  }}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center text-responsive-xs sm:text-responsive-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: ANIMATION_DURATION.slow,
              delay: 0.2,
              ease: ANIMATION_EASING.easeOut,
            }}
          >
            <p>
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}