import { PageHeader } from '@/components/page-header';
import { SERVICES_PROVIDED, APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { ServiceSlider } from '@/components/service-slider';

export const metadata = {
  title: 'Our Services',
  description: `Explore the range of digital solutions offered by ${APP_NAME}, including web development, app development, digital marketing, UI/UX design, and custom software solutions.`,
};

export default function ServicesPage() {
  const processItems = [
    "Discovery & Planning: Understanding your goals and requirements.",
    "Design & Prototyping: Crafting intuitive and engaging user experiences.",
    "Development & Testing: Building robust solutions with rigorous quality assurance.",
    "Deployment & Launch: Ensuring a smooth rollout of your project.",
    "Ongoing Support & Maintenance: Providing continued assistance post-launch."
  ];

  const commitmentItems = [
    { strong: "Quality First:", text: "We are committed to delivering high-quality, bug-free, and scalable solutions." },
    { strong: "Transparent Communication:", text: "We maintain open and honest communication throughout the project lifecycle." },
    { strong: "Timely Delivery:", text: "We respect deadlines and strive to deliver projects on time and within budget." },
    { strong: "Client Satisfaction:", text: "Your success is our priority. We work tirelessly to ensure you are delighted with the final product." },
  ];

  return (
    <>
      <PageHeader
        title="Our Digital Solutions"
        description={`At ${APP_NAME}, we offer a comprehensive suite of services designed to bring your digital vision to life. Explore how we can help you succeed.`}
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <section className="mb-12 md:mb-16">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Services</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover our range of digital services tailored to meet your needs
            </p>
          </ScrollAnimationWrapper>
          <div className="mt-8">
            <ServiceSlider services={SERVICES_PROVIDED} />
          </div>
        </section>

        <section className="py-12 md:py-16 bg-card rounded-lg shadow-lg">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Process & Commitment</h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                We follow a structured yet flexible approach to ensure project success and client satisfaction.
              </p>
            </ScrollAnimationWrapper>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ScrollAnimationWrapper animationType="slideInLeft">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">How We Work</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {processItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper animationType="slideInRight" delay={200}>
                <div className="mt-8 md:mt-0">
                   <h3 className="text-2xl font-semibold text-primary mb-4">Our Commitment to You</h3>
                   <div className="space-y-4 text-muted-foreground">
                    {commitmentItems.map((item, index) => (
                      <p key={index}><strong>{item.strong}</strong> {item.text}</p>
                    ))}
                   </div>
                </div>
              </ScrollAnimationWrapper>
            </div>
            <ScrollAnimationWrapper animationType="fadeInUp" delay={400} className="text-center mt-12">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Discuss Your Project
                </Link>
              </Button>
            </ScrollAnimationWrapper>
          </div>
        </section>
      </div>
    </>
  );
}
