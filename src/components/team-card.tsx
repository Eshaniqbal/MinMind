'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Github, Linkedin, Twitter, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    window.open(member.social.linkedin, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="group bg-card hover:shadow-xl transition-all duration-500 h-full relative overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Card Content */}
      <CardHeader className="relative">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-primary/20 transition-transform duration-500 group-hover:scale-110">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback className="text-lg">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-primary/10 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">{member.name}</CardTitle>
            <p className="text-sm text-primary font-medium">{member.role}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300">{member.description}</p>
        
        {/* Social Links */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <a 
              href={member.social.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={member.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={member.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          
          {/* View Profile Button */}
          <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <span className="text-sm font-medium">View Profile</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 