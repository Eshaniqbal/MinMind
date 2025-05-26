import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { FileText, Code, Book, Terminal, GitBranch, Package } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Documentation',
  description: 'Technical documentation, guides, and resources for developers.',
};

const docs = [
  {
    title: 'Getting Started',
    description: 'Quick start guides and basic setup instructions.',
    icon: FileText,
    href: '/docs/getting-started'
  },
  {
    title: 'API Reference',
    description: 'Detailed API documentation and usage examples.',
    icon: Code,
    href: '/docs/api'
  },
  {
    title: 'Integration Guides',
    description: 'Step-by-step guides for integrating our services.',
    icon: GitBranch,
    href: '/docs/integration'
  },
  {
    title: 'SDK Documentation',
    description: 'Documentation for our software development kits.',
    icon: Package,
    href: '/docs/sdk'
  },
  {
    title: 'CLI Tools',
    description: 'Command-line tools and utilities documentation.',
    icon: Terminal,
    href: '/docs/cli'
  },
  {
    title: 'Best Practices',
    description: 'Development best practices and recommendations.',
    icon: Book,
    href: '/docs/best-practices'
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Documentation"
        description="Explore our technical documentation, guides, and resources to help you build better solutions."
      />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((doc) => (
                <Link key={doc.href} href={doc.href}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <doc.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                        {doc.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{doc.description}</p>
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