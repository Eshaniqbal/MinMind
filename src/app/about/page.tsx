import Image from 'next/image';
import { APP_NAME, FOUNDER_NAME } from '@/lib/constants';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Eye, Zap } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export const metadata = {
  title: 'About Us',
  description: `Learn about ${APP_NAME}, our mission, vision, and the story of our founder, ${FOUNDER_NAME}.`,
};

export default function AboutPage() {
  const missionVisionValues = [
    { icon: Target, title: "Our Mission", content: "To empower businesses and individuals by crafting innovative, high-quality digital solutions that drive growth, efficiency, and success in the modern technological landscape." },
    { icon: Eye, title: "Our Vision", content: "To be a leading digital partner, recognized for our commitment to excellence, technological expertise, and our ability to transform complex challenges into elegant and impactful solutions." },
    { icon: Zap, title: "Our Values", content: <ul className="list-disc list-inside text-muted-foreground space-y-1"><li>Innovation & Creativity</li><li>Quality & Excellence</li><li>Client-Centricity</li><li>Integrity & Transparency</li><li>Continuous Learning</li></ul> },
  ];

  return (
    <>
      <PageHeader
        title="About MinMind"
        description={`Discover the story behind ${APP_NAME}, our values, and our commitment to digital innovation.`}
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Founder Section */}
        <section className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollAnimationWrapper animationType="slideInLeft" className="order-2 md:order-1">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Meet Our Founder</h2>
                <h3 className="text-2xl font-semibold text-primary mb-6">{FOUNDER_NAME}</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Eshan Iqbal, the visionary behind {APP_NAME}, is a passionate software engineer and digital innovator. With a strong foundation in Computer Science and Engineering, Eshan established MinMind to bridge the gap between cutting-edge technology and practical business solutions.
                  </p>
                  <p>
                    His journey began with a simple yet profound realization: technology has the power to transform ideas into reality and solve real-world problems. Driven by this belief, Eshan focuses on delivering high-quality, modern, and responsive digital products that empower individuals and institutions alike.
                  </p>
                  <p>
                    At MinMind, Eshan leads a culture of continuous learning, innovation, and client-centricity, ensuring every project not only meets but exceeds expectations.
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animationType="slideInRight" delay={200} className="order-1 md:order-2 flex justify-center">
              <Image
                src="/founder.jpg"
                alt={`Portrait of ${FOUNDER_NAME}`}
                width={400}
                height={400}
                className="rounded-lg shadow-xl object-cover aspect-square"
                priority
              />
            </ScrollAnimationWrapper>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="mb-12 md:mb-16">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-10">Our Core Principles</h2>
          </ScrollAnimationWrapper>
          <div className="grid md:grid-cols-3 gap-8">
            {missionVisionValues.map((item, index) => (
              <ScrollAnimationWrapper
                key={item.title}
                animationType="fadeInUp"
                delay={index * 150}
                className="h-full"
              >
                <Card className="bg-card hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-primary">
                      <item.icon className="mr-2 h-6 w-6" /> {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof item.content === 'string' ? <p className="text-muted-foreground">{item.content}</p> : item.content}
                  </CardContent>
                </Card>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </section>

        {/* Team Section (Placeholder) */}
        <section>
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              While {APP_NAME} is spearheaded by {FOUNDER_NAME}, we collaborate with a network of talented professionals to deliver the best results for your projects. We believe in the power of teamwork and diverse expertise.
            </p>
            <div className="flex justify-center">
              <Users className="h-24 w-24 text-primary opacity-50" />
            </div>
            <p className="text-center text-muted-foreground mt-4">
              More team information coming soon!
            </p>
          </ScrollAnimationWrapper>
        </section>
      </div>
    </>
  );
}
