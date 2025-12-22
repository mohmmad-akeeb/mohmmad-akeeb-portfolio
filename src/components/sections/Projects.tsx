'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '@/data/projects';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

const INITIAL_PROJECTS_COUNT = 6;

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const hasMoreProjects = projects.length > INITIAL_PROJECTS_COUNT;

  const handleToggleProjects = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="projects" className="section-padding-responsive" aria-labelledby="projects-heading">
      <div className="container-responsive">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 id="projects-heading" className="text-responsive-3xl sm:text-responsive-4xl font-bold text-foreground mb-4">
                Featured Projects
              </h2>
              <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A collection of projects that showcase my technical skills and problem-solving abilities.
                Each project demonstrates different aspects of Artificial Intelligence and Machine Learning.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list" aria-label="Featured projects">
            {projects.slice(0, INITIAL_PROJECTS_COUNT).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {/* Additional projects with animation */}
            <AnimatePresence>
              {showAll && projects.slice(INITIAL_PROJECTS_COUNT).map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project} 
                  index={index + INITIAL_PROJECTS_COUNT} 
                  isAdditional={true}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {hasMoreProjects && (
            <FadeIn>
              <div className="text-center mt-8 md:mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleProjects}
                  className="touch-target"
                  aria-expanded={showAll}
                  aria-controls="additional-projects"
                  aria-label={showAll ? 'Show fewer projects' : `Show ${projects.length - INITIAL_PROJECTS_COUNT} more projects`}
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" aria-hidden="true" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" aria-hidden="true" />
                      Show More ({projects.length - INITIAL_PROJECTS_COUNT})
                    </>
                  )}
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isAdditional?: boolean;
}

function ProjectCard({ project, index, isAdditional = false }: ProjectCardProps) {
  const cardContent = (
    <>
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.imageUrl || '/projects/placeholder.svg'}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 3}
          unoptimized={true}
        />
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              Featured
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3 p-4 sm:p-6">
        <CardTitle as="h3" className="text-responsive-lg sm:text-responsive-xl">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-responsive-sm">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-3 p-4 sm:p-6 pt-0">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2 sm:gap-3 p-4 sm:p-6 flex-col sm:flex-row">
        {project.githubUrl && (
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 touch-target text-responsive-xs"
            onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
            aria-label={`View source code for ${project.title} on GitHub`}
          >
            <Github className="w-4 h-4 mr-2" aria-hidden="true" />
            Code
            <ExternalLink className="w-3 h-3 ml-1 opacity-70" aria-hidden="true" />
          </Button>
        )}
        {project.demoUrl && (
          <Button
            variant="primary"
            size="sm"
            className="w-full sm:flex-1 touch-target text-responsive-xs"
            onClick={() => window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
            Demo
          </Button>
        )}
      </CardFooter>
    </>
  );

  if (isAdditional) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: (index - INITIAL_PROJECTS_COUNT) * 0.1,
          ease: [0.4, 0.0, 0.2, 1] as const,
        }}
      >
        <Card 
          as="article" 
          className={cn(
            'h-full flex flex-col overflow-hidden',
            project.featured && 'ring-2 ring-primary/20'
          )}
          hover={true}
          role="listitem"
        >
          {cardContent}
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0.0, 0.2, 1] as const,
      }}
    >
      <Card 
        as="article" 
        className={cn(
          'h-full flex flex-col overflow-hidden',
          project.featured && 'ring-2 ring-primary/20'
        )}
        hover={true}
        role="listitem"
      >
        {cardContent}
      </Card>
    </motion.div>
  );
}