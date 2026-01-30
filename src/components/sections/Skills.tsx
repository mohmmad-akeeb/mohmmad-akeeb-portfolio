'use client';

import { skills } from '@/data/skills';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import {
  Database,
  GitBranch,
  Container,
  Cloud,
  Zap,
  BarChart3,
  Cpu
} from 'lucide-react';

// Enhanced icon mapping with better visual representations
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // AI/ML
  python: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
      Py
    </div>
  ),
  tensorflow: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      TF
    </div>
  ),
  pytorch: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      PT
    </div>
  ),
  scikitlearn: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      SK
    </div>
  ),

  // Data & Analytics
  sql: Database,
  powerbi: BarChart3,

  // Web Frameworks
  flask: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      FL
    </div>
  ),
  fastapi: Zap,

  // Database
  mongodb: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      M
    </div>
  ),

  // Tools
  git: GitBranch,
  docker: Container,
  aws: Cloud,

  // New Skills - AI/ML & Data Science
  huggingface: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      HF
    </div>
  ),
  rag: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      RAG
    </div>
  ),
  agenticai: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-lg leading-tight text-center px-1">
      AI
    </div>
  ),
  pandas: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Pd
    </div>
  ),
  numpy: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Np
    </div>
  ),
  matplotlib: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Mpl
    </div>
  ),
  seaborn: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Sb
    </div>
  ),
  plotly: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Pl
    </div>
  ),
  bokeh: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Bk
    </div>
  ),
  ml: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      ML
    </div>
  ),
  dl: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      DL
    </div>
  ),

  // New Skills - Web
  react: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Re
    </div>
  ),
  streamlit: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      St
    </div>
  ),
  javascript: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      JS
    </div>
  ),

  // New Skills - Other
  java: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
      Jv
    </div>
  ),
  dsa: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-lg text-center leading-tight">
      DSA
    </div>
  ),
  algorithms: () => (
    <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-lg text-center leading-tight">
      Algo
    </div>
  ),
};

// Category colors for better organization
const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  tools: 'from-purple-500 to-violet-500',
  other: 'from-gray-500 to-slate-500'
};

// Proficiency level descriptions
const proficiencyLabels = {
  1: 'Beginner',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert'
};

function SkillIcon({ iconName, skillName, category }: { iconName: string; skillName: string; category: string }) {
  const IconComponent = iconMap[iconName];

  if (IconComponent) {
    return <IconComponent className="w-8 h-8 text-primary" />;
  }

  // Enhanced fallback with category-based colors
  const gradientClass = categoryColors[category as keyof typeof categoryColors] || categoryColors.other;

  return (
    <div className={`w-8 h-8 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
      {skillName.charAt(0).toUpperCase()}
    </div>
  );
}

function ProficiencyBar({ level }: { level: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${(level / 5) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className="p-3 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
            <SkillIcon iconName={skill.icon} skillName={skill.name} category={skill.category} />
          </div>

          {/* Skill Name */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-sm leading-tight">
              {skill.name}
            </h3>
            <span className="text-xs text-muted-foreground font-medium">
              {proficiencyLabels[skill.proficiency as keyof typeof proficiencyLabels]}
            </span>
          </div>

          {/* Proficiency Bar */}
          <div className="w-full space-y-1">
            <ProficiencyBar level={skill.proficiency} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors] || categoryColors.other}`} />
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  // Group skills by category for better organization
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryTitles = {
    frontend: 'Web Frameworks',
    backend: 'AI/ML & Data Science',
    tools: 'Tools & Platforms',
    other: 'Other Technologies'
  };

  return (
    <section id="skills" className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              Technical Expertise
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Skills & Technologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized in AI/ML, data science, and modern development tools to create intelligent solutions
            </p>
          </FadeIn>

          {/* Skills Grid */}
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                {/* Category Header */}
                <FadeIn>
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-1 h-8 bg-gradient-to-b ${categoryColors[category as keyof typeof categoryColors] || categoryColors.other} rounded-full`} />
                    <h3 className="text-2xl font-bold text-foreground">
                      {categoryTitles[category as keyof typeof categoryTitles] || category}
                    </h3>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                </FadeIn>

                {/* Skills in Category */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={skill.id} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <FadeIn>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{skills.length}+</div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {skills.filter(s => s.proficiency >= 4).length}
                </div>
                <div className="text-muted-foreground">Advanced Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Object.keys(groupedSkills).length}
                </div>
                <div className="text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}