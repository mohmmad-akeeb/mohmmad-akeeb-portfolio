'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { StaggerContainer } from '@/components/animations';

export function Hero() {
  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Assuming resume.pdf is in the public directory
    link.download = 'resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 container-responsive"
      aria-label="Hero section - Introduction"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <StaggerContainer staggerDelay={0.2} initialDelay={0.3}>
          {/* Profile Image */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto">
              <Image
                src="/profile_pic.png"
                alt="John Doe - Full-Stack Developer and UI/UX Designer"
                fill
                className="rounded-full object-cover object-top border-2 sm:border-4 border-border/20 shadow-lg"
                priority
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                loading="eager"
                quality={90}
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
            className="text-responsive-4xl sm:text-responsive-5xl lg:text-responsive-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 leading-tight"
          >
            Mohmmad Akeeb
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
            className="text-responsive-base sm:text-responsive-lg md:text-responsive-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed px-4 sm:px-0"
          >
            AI/ML & Data Science Enthusiast turning data into intelligent solutions and insights that drive innovation and real-world impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4 sm:px-0"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleResumeDownload}
              className="w-full sm:w-auto min-w-[160px] md:min-w-[180px] text-responsive-base font-semibold touch-target"
              aria-label="Download John Doe's resume as PDF"
            >
              Download Resume
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleContactScroll}
              className="w-full sm:w-auto min-w-[160px] md:min-w-[180px] text-responsive-base font-semibold touch-target"
              aria-label="Scroll to contact section"
            >
              Get In Touch
            </Button>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  );
}