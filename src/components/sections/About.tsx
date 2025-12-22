'use client';

import Image from 'next/image';
import { FadeIn, SlideUp } from '@/components/animations';

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <FadeIn className="text-center mb-16 lg:mb-20">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate about turning data into insights and building intelligent solutions
            </p>
          </FadeIn>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Profile Image Section */}
            <SlideUp delay={0.2} className="lg:col-span-5">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                  <div className="aspect-square relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                    <div className="w-full h-full rounded-3xl overflow-hidden bg-background">
                      <Image
                        src="/profile_about.jpg"
                        alt="Mohammad Akeeb - AI/ML Engineer and Data Science Enthusiast"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 50px, 400px"
                        priority
                        quality={90}
                      />
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-2xl blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-card border border-border rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">2+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">10+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Content Section */}
            <SlideUp delay={0.4} className="lg:col-span-7">
              <div className="space-y-8">
                {/* Introduction */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      Hello, I&apos;m Mohmmad Akeeb
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I&apos;m a passionate <span className="text-foreground font-semibold">AI/ML Engineer</span> and 
                    <span className="text-foreground font-semibold"> Data Science enthusiast</span> with a love for 
                    uncovering insights and building intelligent solutions. With expertise in machine learning, 
                    computer vision, and modern AI tools, I transform complex datasets into impactful, real-world innovations.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    When I&apos;m not experimenting with data, you&apos;ll find me exploring emerging AI/ML technologies, 
                    working on research-driven projects, or sharing insights with the data science community. 
                    I believe in continuous learning and staying ahead with the latest advancements in AI and analytics.
                  </p>
                </div>

                {/* Skills & Expertise */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-foreground">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Agentic AI',
                      'RAG',
                      'Computer Vision', 
                      'NLP',
                      'LLM',
                      'Python',
                      'TensorFlow',
                      'PyTorch',
                      'MlOps',
                      'Research'
                    ].map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Location</div>
                        <div className="text-muted-foreground">Jammu and Kashmir, India</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Status</div>
                        <div className="text-muted-foreground">Open to opportunities</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Focus</div>
                        <div className="text-muted-foreground">Computer Vision & AI</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Education</div>
                        <div className="text-muted-foreground">Computer Science</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
}