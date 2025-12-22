'use client';

import { motion } from 'framer-motion';
import { researchPapers } from '@/data/research';
import { Card } from '@/components/ui';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { ExternalLink, Calendar, Users, Tag } from 'lucide-react';

const Research = () => {
  return (
    <section id="research" className="section-padding-responsive bg-muted/20">
      <div className="container-responsive">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-responsive-3xl md:text-responsive-4xl font-bold text-foreground mb-4">
              Research Publications
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Academic contributions and research papers in software engineering,
              machine learning, deep learning and artificial intelligence.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="space-y-6 sm:space-y-8">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="space-y-3 sm:space-y-4">
                  {/* Paper Title */}
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {paper.title}
                    </h3>
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted touch-target"
                        aria-label={`Read full paper: ${paper.title}`}
                      >
                        <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                      </a>
                    )}
                  </div>

                  {/* Authors */}
                  <div className="flex items-center gap-2 text-responsive-xs sm:text-responsive-sm text-muted-foreground">
                    <Users size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="truncate">{paper.authors.join(', ')}</span>
                  </div>

                  {/* Publication Info */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-responsive-xs sm:text-responsive-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                      <span>{paper.year}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium">{paper.publication}</span>
                    </div>
                    {paper.doi && (
                      <div className="text-xs font-mono bg-muted px-2 py-1 rounded self-start">
                        DOI: {paper.doi}
                      </div>
                    )}
                  </div>

                  {/* Abstract */}
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="leading-relaxed text-responsive-sm">{paper.abstract}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex items-start gap-2 flex-wrap">
                    <Tag size={14} className="text-muted-foreground flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {paper.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  {(paper.url || paper.doi) && (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 pt-2 border-t border-border">
                      {paper.url && (
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-responsive-xs sm:text-responsive-sm font-medium text-primary hover:text-primary/80 transition-colors touch-target"
                        >
                          <ExternalLink size={14} />
                          Read Full Paper
                        </a>
                      )}
                      {paper.doi && (
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-responsive-xs sm:text-responsive-sm font-medium text-muted-foreground hover:text-foreground transition-colors touch-target"
                        >
                          <ExternalLink size={14} />
                          View DOI
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Empty State (if no papers) */}
        {researchPapers.length === 0 && (
          <FadeIn>
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                <Users size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Research Papers Yet
              </h3>
              <p className="text-muted-foreground">
                Research publications will be displayed here when available.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default Research;