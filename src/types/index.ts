// Core data models for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string; // Icon component name or URL
  category: 'frontend' | 'backend' | 'tools' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publication: string;
  year: number;
  abstract: string;
  url?: string;
  doi?: string;
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

// Animation types
export interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// Component variant types
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ContactFormState {
  data: ContactForm;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

// Utility types
export type ClassValue = string | number | boolean | undefined | null | ClassValue[];