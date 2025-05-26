import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Case Studies',
  description: 'Explore our detailed case studies and success stories.',
};

const caseStudies = [
  {
    title: 'KashMeds E-commerce Platform',
    description: 'How we built a scalable e-commerce solution that increased sales by 150%.',
    image: '/projects/kashmed.png',
    industry: 'Healthcare',
    results: ['150% increase in sales', '40% reduction in cart abandonment', '99.9% uptime'],
    href: '/projects/case-studies/kashmed'
  },
  {
    title: 'InsightBot AI Assistant',
    description: 'Developing an AI-powered chatbot that reduced customer service costs by 60%.',
    image: '/projects/insightbot.png',
    industry: 'Technology',
    results: ['60% cost reduction', '24/7 customer support', '95% customer satisfaction'],
    href: '/projects/case-studies/insightbot'
  },
  {
    title: 'CampusConnect Portal',
    description: 'Streamlining university operations with a comprehensive digital solution.',
    image: '/projects/campusconnect.png',
    industry: 'Education',
    results: ['80% paperwork reduction', '50% faster admissions', 'Improved student engagement'],
    href: '/projects/case-studies/campusconnect'
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Case Studies"
        description="Discover how we've helped businesses transform their digital presence and achieve remarkable results."
      />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper animationType="fadeInUp">
            <div className="grid grid-cols-1 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.title} className="overflow-hidden group">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-full min-h-[300px]">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <CardHeader className="px-0">
                        <div className="text-sm font-medium text-primary mb-2">
                          {study.industry}
                        </div>
                        <CardTitle className="text-2xl mb-4">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-0">
                        <p className="text-muted-foreground mb-6">
                          {study.description}
                        </p>
                        <div className="mb-6">
                          <h4 className="font-medium mb-2">Key Results:</h4>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {study.results.map((result) => (
                              <li key={result}>{result}</li>
                            ))}
                          </ul>
                        </div>
                        <Button asChild>
                          <Link href={study.href}>
                            Read Full Case Study
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </div>
  );
} 