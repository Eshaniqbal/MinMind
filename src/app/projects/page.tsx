import { PageHeader } from '@/components/page-header';
import { ProjectCard } from '@/components/project-card';
import { PLACEHOLDER_PROJECTS, APP_NAME } from '@/lib/constants';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export const metadata = {
  title: 'Our Projects',
  description: `Browse a selection of web development and CSE projects completed by ${APP_NAME}. See our expertise in action.`,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Our Portfolio"
        description="Explore a collection of projects that showcase our skills, creativity, and commitment to delivering high-quality digital solutions."
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {PLACEHOLDER_PROJECTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLACEHOLDER_PROJECTS.map((project, index) => (
              <ScrollAnimationWrapper
                key={project.id}
                animationType="zoomIn"
                delay={index * 100}
                className="h-full"
              >
                <ProjectCard project={project} />
              </ScrollAnimationWrapper>
            ))}
          </div>
        ) : (
          <ScrollAnimationWrapper animationType="fadeInUp" className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Portfolio is Growing!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're currently working on some exciting projects. Check back soon to see our latest work.
            </p>
          </ScrollAnimationWrapper>
        )}
      </div>
    </>
  );
}
