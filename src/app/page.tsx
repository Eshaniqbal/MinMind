import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Code2, Users, CheckCircle } from 'lucide-react';
import { APP_NAME, FOUNDER_NAME, PLACEHOLDER_PROJECTS, SERVICES_PROVIDED } from '@/lib/constants';
import { ProjectCard } from '@/components/project-card';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { ServiceSlider } from "@/components/service-slider";

export default function HomePage() {
  const featuredProjects = PLACEHOLDER_PROJECTS.slice(0, 2);

  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-card overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <Image 
            src="https://picsum.photos/seed/hero-bg/1920/1080" 
            alt="Abstract background" 
            fill // Changed layout to fill
            sizes="100vw"
            style={{objectFit: "cover"}} // layout="fill" requires objectFit via style or className
            data-ai-hint="abstract technology"
            className="pointer-events-none"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="block text-foreground">Welcome to</span>
              <span className="block text-primary mt-2 sm:mt-4">{APP_NAME}</span>
            </h1>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animationType="fadeInUp" delay={200}>
            <p className="mt-6 max-w-xl md:max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-muted-foreground">
              Founded by {FOUNDER_NAME}, we build modern, responsive websites and deliver high-qualit projects.
              Your vision, our digital expertise.
            </p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animationType="fadeInUp" delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/quote">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">What We Do</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We specialize in turning complex ideas into elegant digital solutions.
            </p>
          </ScrollAnimationWrapper>
          <div className="mt-8">
            <ServiceSlider services={SERVICES_PROVIDED} />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Featured Projects</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A glimpse into our commitment to quality and innovation.
              </p>
            </ScrollAnimationWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ScrollAnimationWrapper
                  key={project.id}
                  animationType="zoomIn"
                  delay={index * 150}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </ScrollAnimationWrapper>
              ))}
            </div>
            <ScrollAnimationWrapper animationType="fadeInUp" delay={300} className="mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link href="/projects">
                  View All Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollAnimationWrapper>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Why Choose MinMind?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Dedicated to excellence, innovation, and client satisfaction.
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Innovative Solutions", description: "We leverage the latest technologies to create solutions that are not just functional but future-proof." },
              { icon: Code2, title: "Expert Development", description: "Our team consists of skilled developers passionate about crafting high-quality code and robust applications." },
              { icon: Users, title: "Client-Centric Approach", description: "We work closely with you, ensuring transparency and collaboration at every stage of the project." },
            ].map((item, index) => (
              <ScrollAnimationWrapper
                key={item.title}
                animationType="fadeInUp"
                delay={index * 150}
                className="h-full"
              >
                <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-card transition-colors duration-300 h-full">
                  <item.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-teal-400 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollAnimationWrapper animationType="zoomIn">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Start Your Project?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg">
              Let's discuss how MinMind can help you achieve your digital goals.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/contact">
                  Contact Us Today
                </Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
}
