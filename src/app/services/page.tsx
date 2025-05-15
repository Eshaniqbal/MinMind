"use client";

import { Globe, Database, Server, Shield, Zap, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies like Next.js, React, and Node.js.",
    features: [
      "Responsive Design",
      "Progressive Web Apps",
      "E-commerce Solutions",
      "Custom CMS Development",
      "Single Page Applications",
      "Cross-browser Compatibility"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"]
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Robust server-side solutions and API development for scalable applications.",
    features: [
      "RESTful APIs",
      "GraphQL",
      "Microservices",
      "Database Design",
      "API Integration",
      "Server Optimization"
    ],
    technologies: ["Node.js", "Python", "Java", "Go", "PostgreSQL", "MongoDB"]
  },
  {
    icon: Server,
    title: "Cloud Solutions",
    description: "Cloud infrastructure setup and management for optimal performance and scalability.",
    features: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Serverless Architecture",
      "Cloud Migration",
      "Infrastructure as Code"
    ],
    technologies: ["AWS", "Azure", "GCP", "Terraform", "Docker", "Kubernetes"]
  },
  {
    icon: Shield,
    title: "Security",
    description: "Comprehensive security solutions to protect your digital assets.",
    features: [
      "SSL/TLS",
      "DDoS Protection",
      "Security Audits",
      "Penetration Testing",
      "Security Monitoring",
      "Compliance Management"
    ],
    technologies: ["OWASP", "SSL/TLS", "WAF", "SIEM", "IDS/IPS"]
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed and performance optimization for better user experience.",
    features: [
      "Load Testing",
      "Caching",
      "CDN Integration",
      "Code Optimization",
      "Database Optimization",
      "Resource Optimization"
    ],
    technologies: ["Lighthouse", "WebPageTest", "Redis", "CDN", "Webpack"]
  },
  {
    icon: Users,
    title: "Consulting",
    description: "Expert guidance on technology choices and digital transformation.",
    features: [
      "Tech Stack Selection",
      "Architecture Design",
      "Best Practices",
      "Technical Due Diligence",
      "Digital Strategy",
      "Technology Roadmap"
    ],
    technologies: ["Architecture Patterns", "Best Practices", "Industry Standards"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-xl bg-background/50 border border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <service.icon className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your digital presence
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
