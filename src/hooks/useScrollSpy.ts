'use client';

import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
}

export function useScrollSpy({ sectionIds, offset = 0, rootMargin = '0px 0px -50% 0px' }: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          const mostVisible = visibleSections[0];
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [sectionIds, rootMargin]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });

    // Update active section immediately for better UX
    setActiveSection(sectionId);
  };

  return {
    activeSection,
    scrollToSection,
  };
}