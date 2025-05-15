import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300">
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          quality={100}
          data-ai-hint={project.dataAiHint || "project image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="space-y-2 p-4">
        <CardTitle className="text-xl font-semibold text-foreground line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary">Tech Stack:</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-2 border-t border-border/50 p-4">
        {project.liveLink && (
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="border-primary text-primary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.repoLink && (
          <Button 
            asChild 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
              <GitBranch className="mr-2 h-4 w-4" />
              View Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
