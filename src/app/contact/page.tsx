import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';
import { APP_NAME } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export const metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${APP_NAME}. Send us a message, or find our contact details here.`,
};

export default function ContactPage() {
  const contactDetails = [
    { icon: Mail, title: "Email", href: "mailto:support@minmind.in", text: "support@minmind.in", subtext: "For general inquiries and project proposals." },
    { icon: Phone, title: "Phone", href: "tel:+916006223504", text: "+91-6006223504", subtext: "Mon - Fri, 9 AM - 6 PM (IST)" }, // Placeholder
    { icon: MapPin, title: "Location", text: "Kulgam, Jammu and Kashmir, India, 192231", subtext: "While we operate remotely, we're always connected." }
  ];

  return (
    <>
      <PageHeader
        title="Get in Touch"
        description="We'd love to hear from you! Whether you have a question about our services, a project proposal, or just want to say hello, feel free to reach out."
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ScrollAnimationWrapper animationType="slideInLeft">
            <Card className="bg-card shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>

          <div className="space-y-8">
            <ScrollAnimationWrapper animationType="slideInRight" delay={100}>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Contact Information</h2>
              <p className="text-lg text-muted-foreground">
                Alternatively, you can reach us through the following channels. We typically respond within 24-48 hours.
              </p>
            </ScrollAnimationWrapper>
            <div className="space-y-6">
              {contactDetails.map((item, index) => (
                <ScrollAnimationWrapper
                  key={item.title}
                  animationType="fadeInUp"
                  delay={200 + index * 150}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.text}</p>
                      )}
                      <p className="text-sm text-muted-foreground/80">{item.subtext}</p>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
