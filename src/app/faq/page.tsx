import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_DATA, APP_NAME } from '@/lib/constants';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: `Find answers to common questions about ${APP_NAME}, our services, processes, and more.`,
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Have questions? We've got answers. Find information about our services, processes, and how we can help you."
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {FAQ_DATA.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQ_DATA.map((faqItem, index) => (
                <ScrollAnimationWrapper
                  key={faqItem.id}
                  animationType="fadeInUp"
                  delay={index * 100}
                  className="w-full" 
                >
                  <AccordionItem value={faqItem.id} className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-foreground hover:no-underline hover:bg-accent/10 transition-colors text-lg">
                      {faqItem.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground text-base leading-relaxed">
                      {faqItem.answer}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollAnimationWrapper>
              ))}
            </Accordion>
          ) : (
            <ScrollAnimationWrapper animationType="fadeInUp" className="text-center py-16">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No FAQs Yet</h2>
              <p className="text-muted-foreground">
                We're compiling our list of frequently asked questions. Check back soon!
              </p>
            </ScrollAnimationWrapper>
          )}
          
          <ScrollAnimationWrapper animationType="zoomIn" delay={FAQ_DATA.length * 100 + 200}>
            <div className="mt-16 p-8 bg-card rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">Can't find your answer?</h3>
              <p className="text-muted-foreground mb-6">
                If you have other questions or need more specific information, please don't hesitate to reach out to us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </>
  );
}
