import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Zap,
  Target,
  TrendingUp,
  Shield,
  Gauge,
  Eye,
  Lightbulb,
  Users,
  Globe,
  Award,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AboutSection() {
  const features = [
    {
      icon: Gauge,
      title: 'Real-Time Performance Analysis',
      description: 'Instant website speed test using Google PageSpeed Insights API v5. Get accurate performance scores and Core Web Vitals metrics in seconds.'
    },
    {
      icon: Target,
      title: 'Core Web Vitals Monitoring',
      description: 'Track LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), FCP, TBT, and Speed Index - essential metrics for Google search rankings.'
    },
    {
      icon: Lightbulb,
      title: 'Smart Recommendations Engine',
      description: 'AI-powered framework detection (React, Next.js, Vue, Angular) with tailored optimization advice and ready-to-use code snippets.'
    },
    {
      icon: Eye,
      title: 'Accessibility + Performance',
      description: 'Combined scoring system analyzing performance, accessibility, and best practices. Get WCAG compliance insights alongside speed metrics.'
    },
    {
      icon: Users,
      title: 'Competitor Analysis',
      description: 'Compare your website performance against competitors. Identify gaps and opportunities for improvement.'
    },
    {
      icon: TrendingUp,
      title: 'Actionable Optimization Tips',
      description: 'Priority-ranked recommendations with impact vs effort analysis. Save time and resources by focusing on high-impact improvements.'
    }
  ];

  const faqs = [
    {
      question: 'What is a website speed test and why is it important?',
      answer: 'A website speed test measures how fast your web pages load and identifies performance bottlenecks. Page speed is crucial for user experience, SEO rankings, and conversion rates. Google uses Core Web Vitals as ranking factors, making regular speed testing essential for maintaining good search visibility.'
    },
    {
      question: 'What are Core Web Vitals?',
      answer: 'Core Web Vitals are Google\'s metrics for measuring user experience: LCP (Largest Contentful Paint) measures loading performance, CLS (Cumulative Layout Shift) measures visual stability, and INP (Interaction to Next Paint) measures interactivity. Our tool uses TBT (Total Blocking Time) as a proxy for INP in lab testing.'
    },
    {
      question: 'How often should I test my website performance?',
      answer: 'Test your website speed regularly, especially after deploying changes, adding new features, or updating content. Monthly performance audits help maintain optimal speed. For high-traffic sites, weekly testing is recommended.'
    },
    {
      question: 'What\'s the difference between mobile and desktop testing?',
      answer: 'Mobile testing simulates slower networks and less powerful devices, typically showing lower scores. Since Google uses mobile-first indexing, mobile performance is critical for SEO. We recommend optimizing for mobile first, as it often represents 60-80% of web traffic.'
    },
    {
      question: 'How does this tool compare to GTmetrix, Pingdom, or WebPageTest?',
      answer: 'Our tool uses Google PageSpeed Insights API, the same data Google uses for search rankings. We enhance it with framework detection, smart recommendations, accessibility scoring, and competitor analysis - features not available in basic speed testing tools.'
    },
    {
      question: 'Can this tool help improve my Google search rankings?',
      answer: 'Yes! Page speed and Core Web Vitals are confirmed Google ranking factors. Our tool identifies specific issues affecting your scores and provides actionable recommendations to improve performance, which can positively impact your SEO rankings.'
    },
    {
      question: 'What do the performance scores mean?',
      answer: 'Scores range from 0-100: 90-100 (Fast/Green) = excellent performance, 50-89 (Moderate/Orange) = needs improvement, 0-49 (Slow/Red) = poor performance requiring immediate attention. These scores are based on Lighthouse metrics.'
    },
    {
      question: 'Why are my lab data and field data different?',
      answer: 'Lab data comes from controlled Lighthouse testing in simulated environments. Field data (when available) shows real user measurements from Chrome User Experience Report (CrUX) over 28 days. Field data is more accurate for real-world performance but requires sufficient traffic.'
    },
    {
      question: 'Do I need technical knowledge to use this tool?',
      answer: 'No! Our tool is designed for everyone - developers, marketers, business owners, and SEO professionals. Results are easy to understand with color-coded scores, plain English explanations, and prioritized action items.'
    },
    {
      question: 'Is this tool free to use?',
      answer: 'Yes, our website performance analyzer is completely free. Test unlimited URLs without registration. We believe everyone deserves access to professional-grade performance testing tools.'
    }
  ];

  const keywords = [
    'Page Speed Test',
    'Core Web Vitals',
    'Website Performance',
    'SEO Optimization',
    'Lighthouse Testing',
    'Mobile Speed',
    'Site Speed Checker',
    'Performance Analyzer'
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* About Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-primary" />
            <CardTitle className="text-3xl">About Our Website Speed Test Tool</CardTitle>
          </div>
          <CardDescription className="text-base">
            Professional-grade website performance analyzer powered by Google PageSpeed Insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to the most comprehensive <strong>free website speed test tool</strong> available online. Our advanced
              <strong> performance analyzer</strong> helps you measure, monitor, and optimize your website's loading speed
              using Google's official PageSpeed Insights API. Whether you're a developer, SEO professional, or business owner,
              our tool provides actionable insights to improve your <strong>Core Web Vitals</strong>, boost search engine rankings,
              and enhance user experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In today's digital landscape, <strong>website performance</strong> is critical for success. Studies show that a
              1-second delay in page load time can reduce conversions by 7% and increase bounce rates significantly. Google
              has made page speed a ranking factor, making regular <strong>performance testing</strong> essential for maintaining
              competitive search visibility. Our tool goes beyond basic speed tests by offering framework-specific recommendations,
              accessibility scoring, and competitor analysis.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Key Features</CardTitle>
          </div>
          <CardDescription>
            Why choose our website performance testing tool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FAQs Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>
            Everything you need to know about website speed testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-base text-amber-900 dark:text-amber-100">Disclaimer</h3>
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                This tool provides performance analysis based on Google PageSpeed Insights API and Lighthouse metrics.
                Results represent lab data from simulated testing environments and may differ from real-world performance.
                Scores and recommendations are for informational purposes only. Actual performance can vary based on user
                location, device, network conditions, and other factors. We recommend using multiple testing tools and
                monitoring real user metrics (RUM) for comprehensive performance insights. This service is provided "as is"
                without warranties. We are not affiliated with Google LLC.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
