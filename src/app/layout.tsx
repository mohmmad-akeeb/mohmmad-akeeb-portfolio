import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DevValidationWrapper } from "@/components/dev/ValidationChecker";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { VercelAnalytics } from "@/components/analytics/VercelAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: {
    default: "Mohmmad Akeeb - AI/ML & Data Science",
    template: "%s | Mohmmad Akeeb Portfolio"
  },
  description: "Data Science and AI/ML Engineer & Researcher specializing in artificial intelligence, machine learning, data analytics, and modern web technologies. Expert in developing data-driven solutions, predictive models, and innovative digital systems for real-world applications.",
  keywords: [
    "Data Science", 
    "Data Scientist", 
    "Artificial Intelligence", 
    "Machine Learning", 
    "Deep Learning", 
    "Data Analytics",
    "Python",
    "Tensorflow",
    "Pytorch",
    "Machine Learning",
    "AI Research",
    "Computer Science", 
    "Portfolio",
    "Mohmmad Akeeb"
  ],
  authors: [{ name: "Mohmmad Akeeb" }],
  creator: "Mohmmad Akeeb",
  publisher: "Mohmmad Akeeb",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohmmad-akeeb-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Mohmmad Akeeb - AI/ML & Data Science',
    description: 'Data Science and AI/ML Engineer & Researcher specializing in artificial intelligence, machine learning, data analytics, and modern web technologies. Expert in developing data-driven solutions, predictive models, and innovative digital systems for real-world applications.',
    siteName: 'Mohmmad Akeeb Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Mohmmad Akeeb - AI/ML & Data Science',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohmmad Akeeb - AI/ML & Data Science',
    description: 'Data Science and AI/ML Engineer & Researcher specializing in artificial intelligence, machine learning, data analytics, and modern web technologies. Expert in developing data-driven solutions, predictive models, and innovative digital systems for real-world applications.',
    images: ['/og-image.svg'],
    creator: '@mohmmad_akeeb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/resume.pdf" as="document" type="application/pdf" />
        <link rel="preload" href="/profile-placeholder.svg" as="image" type="image/svg+xml" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Theme initialization script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var initialTheme = theme || systemTheme;
                  document.documentElement.classList.add(initialTheme);
                  document.documentElement.setAttribute('data-theme', initialTheme);
                  document.documentElement.style.colorScheme = initialTheme;
                } catch (e) {
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohmmad Akeeb",
              "jobTitle": "Data Science and AI/ML Engineer",
              "description": "Data Science and AI/ML Engineer & Researcher specializing in artificial intelligence, machine learning, data analytics, and modern web technologies. Expert in developing data-driven solutions, predictive models, and innovative digital systems for real-world applications.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://mohmmad-akeeb-portfolio.vercel.app',
              "sameAs": [
                "https://linkedin.com/in/mohmmad-akeeb",
                "https://github.com/mohmmad-akeeb"
              ],
              "knowsAbout": [
                "Deep Learning", 
                "Machine Learning", 
                "Data Science", 
                "Data Analytics",
                "Python",
                "Tensorflow",
                "Pytorch",
                "Scikit Learn",
                "Artificial Intelligence",
                "AWS",
                "Git"
              ],
              "alumniOf": "Central University of Kashmir",
              "worksFor": {
                "@type": "Organization",
                "name": "Data Scientist and AI/ML Engineer"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DevValidationWrapper>
          {children}
        </DevValidationWrapper>
        
        {/* Analytics */}
        <GoogleAnalytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
