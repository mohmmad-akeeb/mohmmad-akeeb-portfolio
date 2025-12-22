import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Navigation, Footer } from "@/components/layout";
import { Hero } from "@/components/sections";
import { SkipLink } from "@/components/ui/SkipLink";

// Lazy load non-critical sections for better performance
const About = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.About })), {
  loading: () => <div className="section-padding-responsive bg-background" aria-label="Loading about section" />,
});

const Skills = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Skills })), {
  loading: () => <div className="section-padding-responsive" aria-label="Loading skills section" />,
});

const Projects = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="section-padding-responsive" aria-label="Loading projects section" />,
});

const Research = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Research })), {
  loading: () => <div className="section-padding-responsive bg-background" aria-label="Loading research section" />,
});

const Contact = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="section-padding-responsive bg-background" aria-label="Loading contact section" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Skip to main content link for screen readers */}
      <SkipLink />

      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Main content with proper section ordering and spacing */}
      <main 
        id="main-content" 
        className="relative" 
        role="main"
        tabIndex={-1}
        aria-label="Main content"
      >
        {/* Hero Section - Critical, load immediately */}
        <Hero />

        {/* Lazy loaded sections with suspense boundaries and loading states */}
        <Suspense fallback={
          <div 
            className="section-padding-responsive bg-background" 
            aria-label="Loading about section"
            role="status"
          >
            <div className="container-responsive">
              <div className="loading-skeleton h-8 w-48 mx-auto mb-8 rounded"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="loading-skeleton h-64 w-full rounded-lg"></div>
                <div className="space-y-4">
                  <div className="loading-skeleton h-6 w-full rounded"></div>
                  <div className="loading-skeleton h-6 w-5/6 rounded"></div>
                  <div className="loading-skeleton h-6 w-4/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <About />
        </Suspense>

        <Suspense fallback={
          <div 
            className="section-padding-responsive" 
            aria-label="Loading skills section"
            role="status"
          >
            <div className="container-responsive">
              <div className="loading-skeleton h-8 w-48 mx-auto mb-8 rounded"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="loading-skeleton h-24 w-full rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        }>
          <Skills />
        </Suspense>

        <Suspense fallback={
          <div 
            className="section-padding-responsive" 
            aria-label="Loading projects section"
            role="status"
          >
            <div className="container-responsive">
              <div className="loading-skeleton h-8 w-48 mx-auto mb-8 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="loading-skeleton h-64 w-full rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        }>
          <Projects />
        </Suspense>

        <Suspense fallback={
          <div 
            className="section-padding-responsive bg-background" 
            aria-label="Loading research section"
            role="status"
          >
            <div className="container-responsive">
              <div className="loading-skeleton h-8 w-48 mx-auto mb-8 rounded"></div>
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="loading-skeleton h-32 w-full rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        }>
          <Research />
        </Suspense>

        <Suspense fallback={
          <div 
            className="section-padding-responsive bg-background" 
            aria-label="Loading contact section"
            role="status"
          >
            <div className="container-responsive">
              <div className="loading-skeleton h-8 w-48 mx-auto mb-8 rounded"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="loading-skeleton h-12 w-full rounded"></div>
                  <div className="loading-skeleton h-12 w-full rounded"></div>
                  <div className="loading-skeleton h-32 w-full rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="loading-skeleton h-6 w-full rounded"></div>
                  <div className="loading-skeleton h-6 w-5/6 rounded"></div>
                  <div className="loading-skeleton h-6 w-4/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <Contact />
        </Suspense>
      </main>

      {/* Footer - Site conclusion */}
      <Footer />
    </div>
  );
}
