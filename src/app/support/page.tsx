import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { Button } from '@/components/ui/button';
import { MessageCircle, LifeBuoy, Mail, Phone, FileQuestion, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Support',
  description: 'Get help and support for our services. Find answers to your questions or contact our support team.',
};

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time for immediate assistance.',
    icon: MessageCircle,
    action: 'Start Chat',
    href: '#chat'
  },
  {
    title: 'Help Center',
    description: 'Browse our knowledge base for answers to common questions.',
    icon: LifeBuoy,
    action: 'View Articles',
    href: '/faq'
  },
  {
    title: 'Email Support',
    description: 'Send us an email and we\'ll get back to you within 24 hours.',
    icon: Mail,
    action: 'Send Email',
    href: 'mailto:support@minmind.com'
  },
  {
    title: 'Phone Support',
    description: 'Call us directly for urgent matters during business hours.',
    icon: Phone,
    action: 'Call Now',
    href: 'tel:+1234567890'
  }
];

const resources = [
  {
    title: 'Documentation',
    description: 'Technical documentation and integration guides.',
    icon: BookOpen,
    href: '/docs'
  },
  {
    title: 'FAQs',
    description: 'Frequently asked questions and answers.',
    icon: FileQuestion,
    href: '/faq'
  },
  {
    title: 'Support Hours',
    description: 'Monday - Friday: 9AM - 6PM EST',
    icon: Clock,
    href: '/contact'
  }
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Support Center"
        description="Need help? We're here for you. Choose from the options below to get assistance."
      />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {supportOptions.map((option) => (
                <Card key={option.title} className="group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <option.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{option.description}</p>
                    <Button asChild className="w-full">
                      <Link href={option.href}>{option.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-center mb-8">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Link key={resource.title} href={resource.href}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <resource.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
} 