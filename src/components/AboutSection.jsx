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
      title: 'Automatic Mobile & Desktop Testing',
      description: 'Analyzes both mobile and desktop performance automatically. Compare side-by-side scores and get insights on device-specific optimization needs.'
    },
    {
      icon: Target,
      title: 'Complete Core Web Vitals Analysis',
      description: 'Track LCP, CLS, FCP, TBT, and Speed Index with interactive tooltips explaining each metric. Visual indicators show good, needs improvement, and poor ratings.'
    },
    {
      icon: Lightbulb,
      title: 'Quick Wins Section',
      description: 'Get top 5 high-impact, easy-to-implement optimizations with code snippets, estimated time to fix, and one-click copy functionality.'
    },
    {
      icon: Eye,
      title: '4-in-1 Scoring System',
      description: 'Combined analysis of Performance (40%), Accessibility (25%), SEO (20%), and Best Practices (15%). Comprehensive view of your site health.'
    },
    {
      icon: Shield,
      title: 'Complete SEO Analysis',
      description: 'Detailed SEO audit with issues grouped by priority. Get specific fix recommendations for meta tags, images, structured data, and more.'
    },
    {
      icon: TrendingUp,
      title: 'Smart Priority Sorting',
      description: 'Recommendations automatically sorted by priority (high/medium/low) based on impact and implementation effort. Focus on what matters most.'
    },
    {
      icon: Users,
      title: 'Resource Breakdown',
      description: 'See exactly where your page weight comes from - JavaScript, CSS, images, fonts. Get optimization tips for each resource type.'
    },
    {
      icon: Zap,
      title: 'Page Screenshot & PDF Export',
      description: 'Visual snapshot of your analyzed page with zoom capability. Export professional PDF reports with all scores and recommendations.'
    }
  ];

  const faqs = [
    {
      question: 'What is a website speed test and why is it important?',
      answer: 'A website speed test measures how fast your web pages load and identifies performance bottlenecks. Page speed is crucial for user experience, SEO rankings, and conversion rates. Google uses Core Web Vitals as ranking factors, making regular speed testing essential for maintaining good search visibility.'
    },
    {
      question: 'What are Core Web Vitals?',
      answer: 'Core Web Vitals are Google\'s metrics for measuring user experience: LCP (Largest Contentful Paint) measures loading performance, CLS (Cumulative Layout Shift) measures visual stability, and INP (Interaction to Next Paint) measures interactivity. Our tool uses TBT (Total Blocking Time) as a proxy for INP in lab testing. Hover over the help icons next to each metric for detailed explanations.'
    },
    {
      question: 'Why does the tool test both mobile and desktop automatically?',
      answer: 'Mobile and desktop performance can differ significantly. Since 60-80% of web traffic comes from mobile devices and Google uses mobile-first indexing, both perspectives are important. Our tool automatically tests mobile first (most critical), then desktop, so you can compare performance across devices and identify device-specific optimization opportunities.'
    },
    {
      question: 'What are "Quick Wins" and how do I use them?',
      answer: 'Quick Wins are the top 5 highest-impact optimizations that are easiest to implement. Each shows estimated time to fix, potential savings, and includes copy-paste ready code snippets. Start here for the fastest performance improvements with minimal effort.'
    },
    {
      question: 'How is the priority of recommendations determined?',
      answer: 'Recommendations are automatically prioritized as High, Medium, or Low based on two factors: impact (time/size savings) and implementation effort. High priority items have significant impact and are easy-to-medium difficulty. This helps you focus on optimizations that deliver the best return on investment.'
    },
    {
      question: 'Can I export the results?',
      answer: 'Yes! Click the "Export PDF" button at the top of your results to download a professional PDF report. The report includes all scores, Core Web Vitals metrics, and top optimization opportunities - perfect for sharing with team members or clients.'
    },
    {
      question: 'What does the Resource Breakdown show?',
      answer: 'The Resource Breakdown analyzes your page weight by type: JavaScript, CSS, Images, Fonts, Documents, and Other. It shows the size, count, and percentage for each category with specific optimization tips. This helps identify which resource types are bloating your page.'
    },
    {
      question: 'What\'s included in the SEO Analysis?',
      answer: 'Our SEO Analysis examines 13+ SEO factors including meta tags, image alt text, mobile-friendliness, structured data, and more. Issues are grouped by priority (high/medium/low) with specific fix recommendations for each. The SEO score contributes 20% to your combined score.'
    },
    {
      question: 'How does this tool compare to GTmetrix, Pingdom, or WebPageTest?',
      answer: 'Our tool uses Google PageSpeed Insights API - the same data Google uses for search rankings. We enhance it with automatic mobile/desktop testing, framework detection, Quick Wins, resource breakdown, SEO analysis, PDF export, and priority-sorted recommendations. These features go beyond basic speed testing tools.'
    },
    {
      question: 'What if the analysis fails or times out?',
      answer: 'Our tool includes automatic retry logic with exponential backoff (up to 3 attempts). If a request fails due to network issues, rate limiting, or server errors, it will automatically retry with increasing delays (2s, 4s, 8s). You\'ll see the retry progress in the error message.'
    },
    {
      question: 'Is this tool free to use?',
      answer: 'Yes! Our website performance analyzer is completely free with unlimited tests. No registration required. Test as many URLs as you need, export PDFs, and access all features at no cost.'
    }
  ];

  const keywords = [
    'Page Speed Test',
    'Core Web Vitals',
    'Mobile Performance',
    'Desktop Performance',
    'SEO Analysis',
    'PDF Export',
    'Quick Wins',
    'Resource Breakdown',
    'Performance Analyzer',
    'Lighthouse Testing'
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
              <strong> performance analyzer</strong> automatically tests both mobile and desktop performance, providing a complete
              view of your site's speed using Google's official PageSpeed Insights API. Whether you're a developer, SEO professional,
              or business owner, get actionable insights to improve your <strong>Core Web Vitals</strong>, boost search engine rankings,
              and enhance user experience with features like Quick Wins, SEO analysis, and PDF export.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In today's digital landscape, <strong>website performance</strong> is critical for success. Studies show that a
              1-second delay in page load time can reduce conversions by 7% and increase bounce rates significantly. Google
              has made page speed a ranking factor, making regular <strong>performance testing</strong> essential for maintaining
              competitive search visibility. Our tool goes beyond basic speed tests with automatic mobile/desktop comparison,
              priority-sorted recommendations, resource breakdown analysis, complete SEO audits, and professional PDF reports.
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
