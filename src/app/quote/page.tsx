import { PageHeader } from '@/components/page-header';
import { QuoteForm } from '@/components/quote-form';
import { APP_NAME } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, MessageCircle } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export const metadata = {
  title: 'Get a Quote',
  description: `Request a project quote from ${APP_NAME}. Tell us about your needs, and we'll provide a customized estimate.`,
};

export default function QuotePage() {
  const processSteps = [
    { icon: FileText, title: "1. Submit Your Request", description: "Fill out the form with your project details." },
    { icon: Lightbulb, title: "2. We Review & Analyze", description: "Our team will carefully review your requirements." },
    { icon: MessageCircle, title: "3. We Contact You", description: "We'll reach out to discuss your project further and provide a quote." }
  ];

  return (
    <>
      <PageHeader
        title="Request a Project Quote"
        description="Ready to start your next digital venture? Fill out the form below with your project details, and our team will get back to you with a personalized quote and consultation."
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <Card className="bg-card shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Tell Us About Your Project</CardTitle>
                <CardDescription>
                  The more details you provide, the better we can understand your vision and requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuoteForm />
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animationType="zoomIn" delay={200}>
            <div className="mt-12 p-8 bg-card rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-6 text-center">What Happens Next?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {processSteps.map((step, index) => (
                  <ScrollAnimationWrapper
                    key={step.title}
                    animationType="fadeInUp"
                    delay={index * 150 + 200} // Add to initial delay of parent wrapper
                  >
                    <div className="flex flex-col items-center">
                      <step.icon className="h-10 w-10 text-primary mb-3" />
                      <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </ScrollAnimationWrapper>
                ))}
              </div>
               <p className="text-center text-muted-foreground mt-8">
                We aim to respond to all quote requests within 1-2 business days.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </>
  );
}
