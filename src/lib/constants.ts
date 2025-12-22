// Navigation constants
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'contact', label: 'Contact', href: '#contact' }
] as const;

// Animation constants
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
} as const;

export const ANIMATION_EASING = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55]
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

// Theme constants
export const THEME_STORAGE_KEY = 'portfolio-theme';

// Form validation constants
export const FORM_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50
  },
  email: {
    maxLength: 100
  },
  subject: {
    maxLength: 100
  },
  message: {
    minLength: 10,
    maxLength: 1000
  }
} as const;

// Social media links
export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/mohmmad-akeeb/mohmmad-akeeb',
    icon: 'github'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/mohmmad-akeeb',
    icon: 'linkedin'
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    url: 'https://kaggle.com/mohmmadakeeb',
    icon: 'kaggle'
  },
  {
    id: 'twitter',
    label: 'Twitter',
    url: 'https://x.com/mohmmad_akeeb',
    icon: 'twitter'
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:mohammadakeeb786@gmail.com',
    icon: 'mail'
  }
] as const;

// Contact information (placeholder data)
export const CONTACT_INFO = {
  email: 'mohammadakeeb786@gmail.com',
  phone: '+91 9541703348',
  location: 'Jammu and Kashmir, India',
  linkedin: 'https://linkedin.com/in/mohmmad-akeeb'
} as const;