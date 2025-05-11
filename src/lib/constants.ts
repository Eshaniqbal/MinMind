import type { NavItem, Project, Service, FaqItem } from './types';
import { Home, Info, Briefcase, Lightbulb, MessageSquare, FileText, HelpCircle, GitBranch, Users, Palette, Bot, Code2, ShieldQuestion, Rocket, Smartphone, BarChart } from 'lucide-react';

export const APP_NAME = "MinMind Digital Solutions";
export const FOUNDER_NAME = "Eshan Iqbal";

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About Us', href: '/about', icon: Info },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Projects', href: '/projects', icon: Palette },
  { label: 'Contact', href: '/contact', icon: MessageSquare },
  { label: 'Get a Quote', href: '/quote', icon: FileText },
  { label: 'FAQs', href: '/faq', icon: HelpCircle },
];

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Get a Quote', href: '/quote' },
    { label: 'FAQs', href: '/faq' },
    // { label: 'Blog', href: '/blog' }, // Optional
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' }, // Placeholder
    { label: 'Terms of Service', href: '#' }, // Placeholder
  ]
};

export const SOCIAL_LINKS: NavItem[] = [
    { label: 'GitHub', href: '#', icon: GitBranch }, // Replace # with actual link
    { label: 'LinkedIn', href: '#', icon: Users },
    { label: 'Instagram', href: '#', icon: Users }, // Using Users icon as Instagram is not imported
    // Replace # with actual link
];

export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform "KashMeds"',
    description: 'A full-featured e-commerce platform built with Next.js for optimal performance, Stripe for secure payments, and advanced product management capabilities.',
    imageUrl: 'https://picsum.photos/seed/shop/600/400',
    dataAiHint: 'e-commerce website',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    liveLink: '#',
  },
  {
    id: '2',
    title: 'AI-Powered Chatbot "InsightBot"',
    description: 'A customer service chatbot leveraging NLP and machine learning to provide instant, intelligent support and enhance user engagement.',
    imageUrl: 'https://picsum.photos/seed/aibot/600/400',
    dataAiHint: 'chatbot interface',
    techStack: ['Python', 'Flask', 'React', 'Docker', 'NLP'],
    repoLink: '#',
  },
  {
    id: '3',
    title: 'University Portal "CampusConnect"',
    description: 'A comprehensive portal for students and faculty, streamlining course registration, grade management, and campus-wide communication.',
    imageUrl: 'https://picsum.photos/seed/portal/600/400',
    dataAiHint: 'dashboard analytics',
    techStack: ['Java Spring Boot', 'Angular', 'MySQL', 'AWS'],
  },
   {
    id: '4',
    title: 'Personal Portfolio "DevFolio"',
    description: 'A sleek, modern, and animated personal portfolio website designed to effectively showcase skills, projects, and professional experience.',
    imageUrl: 'https://picsum.photos/seed/devfolio/600/400',
    dataAiHint: 'portfolio design',
    techStack: ['React', 'Gatsby', 'GraphQL', 'Netlify'],
    liveLink: '#',
  },
];

export const SERVICES_PROVIDED = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'We create modern, responsive, and high-performance websites using cutting-edge technologies. From simple landing pages to complex web applications, we deliver excellence in every pixel.',
    iconName: 'Code2',
  },
  {
    id: 'app-dev',
    title: 'App Development',
    description: 'Transform your ideas into powerful mobile and desktop applications. We specialize in creating intuitive, scalable, and feature-rich applications that deliver exceptional user experiences.',
    iconName: 'Smartphone',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Boost your online presence with our comprehensive digital marketing solutions. From SEO and social media management to content strategy and analytics, we help you reach and engage your target audience effectively.',
    iconName: 'BarChart',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Create memorable user experiences with our expert UI/UX design services. We combine aesthetics with functionality to design interfaces that are not just beautiful but also intuitive and user-friendly.',
    iconName: 'Palette',
  },
  {
    id: 'custom-solutions',
    title: 'Custom Digital Solutions',
    description: 'Need a unique digital solution? We provide tailored software development, API integrations, and strategic IT consulting to turn your innovative ideas into reality.',
    iconName: 'Bot',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq1',
    question: 'What technologies does MinMind specialize in?',
    answer: `At MinMind, we specialize in a wide array of modern technologies including Next.js, React, Node.js, Python, Java, and various SQL/NoSQL database systems. Our approach is to select the optimal tech stack that aligns perfectly with your project's specific requirements and goals.`,
  },
  {
    id: 'faq2',
    question: 'What is the typical timeframe for developing a website?',
    answer: 'The timeline for a website project is highly dependent on its complexity, the number of features, and your specific requirements. A simple informational website might take 2-4 weeks, whereas a complex web application with custom features could take 2-6 months or longer. We provide a detailed project timeline after an initial consultation and scope definition.',
  },
  {
    id: 'faq3',
    question: 'Does MinMind offer support for CSE academic projects?',
    answer: 'Absolutely! We provide comprehensive support for Computer Science and Engineering academic projects. This includes project ideation, development, debugging, documentation, and mentorship to help students learn effectively and achieve academic success.',
  },
  {
    id: 'faq4',
    question: 'How can I request a quote for my project from MinMind?',
    answer: 'Requesting a quote is easy! Simply navigate to our "Get a Quote" page and fill out the form with as much detail as possible about your project. This helps us understand your needs better. We will review your submission and get back to you promptly with an estimated cost and to discuss the next steps.',
  },
  {
    id: 'faq5',
    question: 'What is MinMind\'s approach to UI/UX design?',
    answer: 'We believe that a great user experience is key to a successful digital product. Our design process is user-centric, focusing on creating intuitive, accessible, and aesthetically pleasing interfaces. We use modern design principles and tools to ensure your project is not only functional but also delightful to use.'
  }
];