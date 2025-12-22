'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { FadeIn } from '@/components/animations/FadeIn';
import type { ContactForm, ContactFormState } from '@/types';

// Contact information data
const contactInfo = [
  {
    id: 'email',
    label: 'Email',
    value: 'mohammadakeeb786@gmail.com',
    href: 'mailto:mohammadakeeb786@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+(91) 9541703348',
    href: 'tel:+919541703348',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/mohmmad-akeeb',
    href: 'https://www.linkedin.com/in/mohmmad-akeeb/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

// Form validation functions
const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return undefined;
};

const validateName = (name: string): string | undefined => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return undefined;
};

const validateMessage = (message: string): string | undefined => {
  if (!message) return 'Message is required';
  if (message.length < 10) return 'Message must be at least 10 characters';
  return undefined;
};

const validateForm = (data: ContactForm) => {
  const errors: { [key: string]: string | undefined } = {};
  
  errors.name = validateName(data.name);
  errors.email = validateEmail(data.email);
  errors.message = validateMessage(data.message);
  
  return errors;
};

export function Contact() {
  const [formState, setFormState] = useState<ContactFormState>({
    data: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
  });

  const handleInputChange = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      errors: {
        ...prev.errors,
        [field]: undefined, // Clear error when user starts typing
      },
    }));
  };

  const handleBlur = (field: keyof ContactForm) => () => {
    const value = formState.data[field] || '';
    let error: string | undefined;

    switch (field) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    if (error) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: error,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formState.data);
    const hasErrors = Object.values(errors).some(error => error !== undefined);

    if (hasErrors) {
      setFormState(prev => ({
        ...prev,
        errors,
      }));
      return;
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      errors: {},
    }));

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
      const accessKey = process.env.NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY;

      if (!endpoint || !accessKey) {
        throw new Error('Contact form configuration is missing. Please check your environment variables.');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.data.name,
          email: formState.data.email,
          subject: formState.data.subject || 'Portfolio Contact Form',
          message: formState.data.message,
          from_name: 'Portfolio Contact Form',
          to_name: 'Mohammad Akeeb',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
          data: {
            name: '',
            email: '',
            subject: '',
            message: '',
          },
        }));

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormState(prev => ({
            ...prev,
            isSubmitted: false,
          }));
        }, 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('Contact form error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: {
          submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        },
      }));
    }
  };

  return (
    <section id="contact" className="section-padding-responsive bg-background" aria-labelledby="contact-heading">
      <div className="container-responsive">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 id="contact-heading" className="text-responsive-3xl md:text-responsive-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I&apos;m always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and innovation.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <StaggerContainer staggerDelay={0.1} initialDelay={0.2}>
            <div className="space-y-6">
              <div>
                <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold text-foreground mb-2">
                  Send me a message
                </h3>
                <p className="text-muted-foreground text-responsive-sm">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    type="text"
                    value={formState.data.name}
                    onChange={handleInputChange('name')}
                    onBlur={handleBlur('name')}
                    error={formState.errors.name}
                    required
                    disabled={formState.isSubmitting}
                    placeholder="Your full name"
                    size="lg"
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    value={formState.data.email}
                    onChange={handleInputChange('email')}
                    onBlur={handleBlur('email')}
                    error={formState.errors.email}
                    required
                    disabled={formState.isSubmitting}
                    placeholder="your.email@example.com"
                    size="lg"
                  />
                </div>

                <Input
                  label="Subject"
                  type="text"
                  value={formState.data.subject}
                  onChange={handleInputChange('subject')}
                  disabled={formState.isSubmitting}
                  placeholder="What&apos;s this about?"
                  size="lg"
                />

                <Textarea
                  label="Message"
                  value={formState.data.message}
                  onChange={handleInputChange('message')}
                  onBlur={handleBlur('message')}
                  error={formState.errors.message}
                  required
                  disabled={formState.isSubmitting}
                  placeholder="Tell me about your project or just say hello..."
                  rows={6}
                  className="min-h-[120px] sm:min-h-[140px]"
                />

                {formState.errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-destructive/10 border border-destructive/20 rounded-md"
                    role="alert"
                    aria-live="assertive"
                  >
                    <p className="text-sm text-destructive">
                      {formState.errors.submit}
                    </p>
                  </motion.div>
                )}

                {formState.isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Thank you for your message! I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full sm:w-auto touch-target"
                  size="lg"
                  aria-describedby={formState.isSubmitting ? "sending-status" : undefined}
                >
                  {formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      <span id="sending-status">Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>
          </StaggerContainer>

          {/* Contact Information */}
          <StaggerContainer staggerDelay={0.1} initialDelay={0.4}>
            <div className="space-y-6">
              <div>
                <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold text-foreground mb-2">
                  Contact Information
                </h3>
                <p className="text-muted-foreground text-responsive-sm">
                  Prefer to reach out directly? You can find me on these platforms.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4" role="list" aria-label="Contact information">
                {contactInfo.map((contact) => (
                  <motion.a
                    key={contact.id}
                    href={contact.href}
                    target={contact.id === 'linkedin' ? '_blank' : undefined}
                    rel={contact.id === 'linkedin' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors duration-200 group touch-target"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="listitem"
                    aria-label={`Contact via ${contact.label}: ${contact.value}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-200">
                      {contact.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-responsive-sm">
                        {contact.label}
                      </p>
                      <p className="text-responsive-xs text-muted-foreground truncate">
                        {contact.value}
                      </p>
                    </div>
                    {contact.id === 'linkedin' && (
                      <div className="flex-shrink-0">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="pt-4 sm:pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-3 text-responsive-sm">
                  Let&apos;s connect!
                </h4>
                <p className="text-responsive-xs text-muted-foreground leading-relaxed">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I&apos;d love to hear from you. I typically respond within 24 hours.
                </p>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}