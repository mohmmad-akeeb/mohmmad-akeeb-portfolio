# Design Document

## Overview

The personal portfolio website will be built as a single-page application (SPA) using Next.js 15 with the App Router, leveraging React 19's latest features. The design follows a modern, clean aesthetic with smooth animations powered by Framer Motion 12 and responsive styling through TailwindCSS 4. The site will feature a vertical scrolling layout with distinct sections, each optimized for different viewport sizes and interaction patterns.

## Architecture

### Technology Stack
- **Framework**: Next.js 15.5.4 with App Router
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4 with custom design tokens
- **Animations**: Framer Motion 12.23.22
- **Typography**: Geist Sans and Geist Mono fonts
- **Deployment**: Vercel (optimized for Next.js)

### Application Structure
The application follows a component-based architecture with clear separation of concerns:

```
src/
├── app/
│   ├── layout.tsx (Root layout with providers)
│   ├── page.tsx (Main portfolio page)
│   ├── globals.css (Global styles and CSS variables)
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Research.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ThemeToggle.tsx
│   └── animations/
│       ├── FadeIn.tsx
│       ├── SlideUp.tsx
│       └── StaggerContainer.tsx
├── hooks/
│   ├── useTheme.ts
│   ├── useScrollSpy.ts
│   └── useIntersectionObserver.ts
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts
└── data/
    ├── projects.ts
    ├── skills.ts
    └── research.ts
```

## Components and Interfaces

### Core Layout Components

#### Navigation Component
- **Purpose**: Sticky navigation with smooth scroll and active section highlighting
- **Features**: 
  - Responsive hamburger menu for mobile
  - Smooth scroll to sections using `scrollIntoView`
  - Active section highlighting using Intersection Observer
  - Theme toggle integration
- **State Management**: Uses custom `useScrollSpy` hook for active section tracking

#### Footer Component
- **Purpose**: Social links and copyright information
- **Features**:
  - Social media icons with hover animations
  - Responsive layout adaptation
  - Consistent theming with rest of application

### Section Components

#### Hero Section
- **Layout**: Full viewport height with centered content
- **Content**: Name, tagline, CTA button
- **Animations**: Staggered fade-in and slide-up effects
- **Responsive**: Typography scales appropriately across devices

#### About Section
- **Layout**: Two-column layout (desktop) / single column (mobile)
- **Content**: Profile image and biographical text
- **Animations**: Image and text animate in from different directions
- **Image Handling**: Next.js Image component with optimization

#### Skills Section
- **Layout**: CSS Grid with responsive column counts
- **Content**: Skill icons and names
- **Animations**: Staggered grid item animations
- **Grid Breakpoints**: 
  - Mobile: 2 columns
  - Tablet: 3 columns  
  - Desktop: 4 columns

#### Projects Section
- **Layout**: Card-based grid layout with expandable cards
- **Content**: Project cards with title, truncated/full description, technologies, links
- **Animations**: Cards animate in with hover effects, smooth expand/collapse transitions
- **Interactions**: 
  - Click to expand/collapse cards for detailed view
  - GitHub and demo links with external link indicators
  - Click outside to close expanded cards
- **State Management**: Track expanded card state and handle multiple card interactions
- **Responsive Behavior**: Expanded cards adapt layout for mobile devices

#### Research Section
- **Layout**: List-based layout with paper cards
- **Content**: Publication details, abstracts, external links
- **Animations**: Sequential card animations
- **Accessibility**: Proper heading hierarchy and link descriptions

#### Contact Section
- **Layout**: Form and contact info side-by-side (desktop) / stacked (mobile)
- **Content**: Contact form and alternative contact methods
- **Form Handling**: Client-side validation with feedback
- **Animations**: Form elements animate in sequence

### UI Components

#### Button Component
- **Variants**: Primary, secondary, outline
- **States**: Default, hover, active, disabled
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: Proper focus states and ARIA attributes

#### Card Component
- **Purpose**: Reusable container for projects and research papers
- **Features**: Hover effects, consistent spacing, responsive design
- **Theming**: Adapts to light/dark mode automatically

#### Input Component
- **Purpose**: Form inputs with consistent styling
- **Features**: Validation states, floating labels, error messages
- **Accessibility**: Proper labeling and error announcements

#### ThemeToggle Component
- **Purpose**: Dark/light mode switcher
- **Features**: System preference detection, smooth transitions
- **Persistence**: Uses localStorage to remember user preference
- **Icon**: Animated sun/moon icon transition

#### Expandable Project Cards
- **Purpose**: Enhanced project information display
- **Features**: 
  - Click to expand/collapse functionality
  - Smooth height and content transitions using Framer Motion
  - Full description and complete technology list in expanded state
  - Click outside to close behavior
  - Keyboard navigation support (Enter/Space to toggle, Escape to close)
- **State Management**: Uses React state to track which card is expanded
- **Animations**: 
  - Height animation with `layoutId` for smooth transitions
  - Staggered content reveal in expanded state
  - Smooth collapse with content fade-out
- **Accessibility**: 
  - Proper ARIA attributes for expanded/collapsed states
  - Focus management when expanding/collapsing
  - Screen reader announcements for state changes

### Animation Components

#### FadeIn Component
- **Purpose**: Wrapper for fade-in animations
- **Implementation**: Uses Framer Motion with Intersection Observer
- **Configuration**: Customizable delay, duration, and easing

#### SlideUp Component
- **Purpose**: Slide-up entrance animations
- **Implementation**: Combines opacity and transform animations
- **Usage**: Applied to section content as it enters viewport

#### StaggerContainer Component
- **Purpose**: Orchestrates staggered animations for child elements
- **Implementation**: Uses Framer Motion's stagger functionality
- **Applications**: Skills grid, project cards, navigation items

## Data Models

### Project Interface
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

interface ProjectCardState {
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}
```

### Skill Interface
```typescript
interface Skill {
  id: string;
  name: string;
  icon: string; // Icon component name or URL
  category: 'frontend' | 'backend' | 'tools' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5;
}
```

### Research Paper Interface
```typescript
interface ResearchPaper {
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
```

### Contact Form Interface
```typescript
interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
```

## Error Handling

### Form Validation
- **Client-side**: Real-time validation using React Hook Form or similar
- **Error Display**: Inline error messages with clear, actionable feedback
- **Accessibility**: Error announcements for screen readers

### Image Loading
- **Fallbacks**: Placeholder images for failed loads
- **Loading States**: Skeleton loaders during image loading
- **Optimization**: Next.js Image component with proper sizing

### Animation Performance
- **Reduced Motion**: Respect user's motion preferences
- **Performance Monitoring**: Avoid animations that cause layout thrashing
- **Graceful Degradation**: Fallback to CSS transitions if Framer Motion fails

### Theme System
- **Fallback**: Default to light theme if localStorage is unavailable
- **System Integration**: Respect system dark mode preference
- **Smooth Transitions**: Prevent flash of unstyled content during theme changes

## Testing Strategy

### Component Testing
- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions and data flow
- **Accessibility Tests**: Automated a11y testing with jest-axe
- **Visual Regression**: Screenshot testing for UI consistency

### Animation Testing
- **Motion Tests**: Verify animations trigger correctly
- **Performance Tests**: Ensure animations don't impact performance
- **Reduced Motion**: Test fallbacks for users with motion sensitivity

### Responsive Testing
- **Viewport Testing**: Test across different screen sizes
- **Touch Interactions**: Verify mobile touch targets and gestures
- **Cross-browser**: Test in major browsers (Chrome, Firefox, Safari, Edge)

### Form Testing
- **Validation Testing**: Test form validation rules and error states
- **Submission Testing**: Mock form submissions and success/error handling
- **Accessibility Testing**: Test keyboard navigation and screen reader support

## Performance Considerations

### Code Splitting
- **Dynamic Imports**: Lazy load non-critical components
- **Route-based Splitting**: Automatic with Next.js App Router
- **Component-based Splitting**: Split large components when beneficial

### Image Optimization
- **Next.js Image**: Automatic optimization and lazy loading
- **WebP/AVIF**: Modern image formats with fallbacks
- **Responsive Images**: Multiple sizes for different viewports

### Animation Performance
- **GPU Acceleration**: Use transform and opacity for animations
- **Intersection Observer**: Only animate elements in viewport
- **Animation Cleanup**: Proper cleanup to prevent memory leaks

### Bundle Optimization
- **Tree Shaking**: Remove unused code from final bundle
- **Dependency Analysis**: Monitor bundle size and optimize imports
- **Critical CSS**: Inline critical styles for faster initial render

## Deployment Configuration

### Vercel Optimization
- **Build Settings**: Optimized for Next.js with automatic deployments
- **Environment Variables**: Secure handling of any API keys or secrets
- **Performance Monitoring**: Built-in analytics and Core Web Vitals tracking
- **Edge Functions**: Utilize edge runtime for optimal performance

### SEO and Meta Tags
- **Dynamic Metadata**: Proper title, description, and Open Graph tags
- **Structured Data**: JSON-LD for enhanced search results
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Proper crawling instructions

### Security Headers
- **Content Security Policy**: Prevent XSS attacks
- **HTTPS Enforcement**: Secure connections only
- **Privacy**: No unnecessary tracking or data collection