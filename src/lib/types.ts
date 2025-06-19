import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  items?: NavItem[];
  highlight?: boolean;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveLink?: string;
  repoLink?: string;
  dataAiHint?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  iconName: 'Code2' | 'Smartphone' | 'BarChart' | 'Palette' | 'Bot';
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;


export const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().optional(),
  projectType: z.enum([
    "web-development",
    "mobile-app",
    "ecommerce",
    "portfolio",
    "cse-project",
    "custom-solution",
    "other"
  ], { required_error: "Please select a project type." }),
  budget: z.string().optional(),
  details: z.string().min(20, { message: "Please provide at least 20 characters of details." }),
});
export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export interface FormState {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    company?: string[];
    projectType?: string[];
    budget?: string[];
    details?: string[];
  } | null;
  success?: boolean;
}