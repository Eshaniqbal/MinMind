import type { NavItem, Project, Service, FaqItem } from './types';
import { Home, Info, Briefcase, Lightbulb, MessageSquare, FileText, HelpCircle, GitBranch, Users, Palette, Bot, Code2, ShieldQuestion, Rocket, Smartphone, BarChart, BookOpen } from 'lucide-react';

export const APP_NAME = "MinMind Digital Solutions";
export const FOUNDER_NAME = "Eshan Iqbal";

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { 
    label: 'About Us', 
    href: '/about', 
    icon: Info,
    items: [
      { label: 'Overview', href: '/about' },
      { label: 'Careers', href: '/careers', icon: Users },
    ]
  },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Projects', href: '/projects', icon: Palette },
  { label: 'Blog', href: '/blog', icon: BookOpen },
  { label: 'Contact', href: '/contact', icon: MessageSquare },
  { label: 'Get a Quote', href: '/quote', icon: FileText },
  { label: 'FAQs', href: '/faq', icon: HelpCircle },
];

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Get a Quote', href: '/quote' },
    { label: 'FAQs', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' }, // Placeholder
    { label: 'Terms of Service', href: '/terms-of-service' }, // Placeholder
  ]
};

export const SOCIAL_LINKS: NavItem[] = [
    { label: 'GitHub', href: 'https://github.com/Eshaniqbal', icon: GitBranch }, // Replace # with actual link
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eshaniqbal/', icon: Users },
    { label: 'Instagram', href: 'https://www.instagram.com/eshaniqbal_', icon: Users }, // Using Users icon as Instagram is not imported
    // Replace # with actual link
];

export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform "KashMeds"',
    description: 'A full-featured e-commerce platform built with Next.js for optimal performance, Stripe for secure payments, and advanced product management capabilities.',
    imageUrl: '/projects/kashmed.png',
    dataAiHint: 'e-commerce website',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    liveLink: 'https://healkart.vercel.app/',
  },
  {
    id: '2',
    title: 'AI-Powered Chatbot "InsightBot"',
    description: 'A customer service chatbot leveraging NLP and machine learning to provide instant, intelligent support and enhance user engagement.',
    imageUrl: '/projects/insightbot.png',
    dataAiHint: 'chatbot interface',
    techStack: ['Python', 'Flask', 'React', 'Docker', 'NLP'],
    repoLink: 'https://github.com/eshaniqbal',
  },
  {
    id: '3',
    title: 'University Portal "CampusConnect"',
    description: 'A comprehensive portal for students and faculty, streamlining course registration, grade management, and campus-wide communication.',
    imageUrl: '/projects/campusconnect.png',
    dataAiHint: 'dashboard analytics',
    techStack: ['Java Spring Boot', 'Angular', 'MySQL', 'AWS'],
  },
  {
    id: '4',
    title: 'Personal Portfolio "DevFolio"',
    description: 'A sleek, modern, and animated personal portfolio website designed to effectively showcase skills, projects, and professional experience.',
    imageUrl: '/projects/devfolio.png',
    dataAiHint: 'portfolio design',
    techStack: ['React', 'Gatsby', 'GraphQL', 'Netlify'],
    liveLink: 'https://eshaniqbal.github.io/portfolio1',
  },
];

export const SERVICES_PROVIDED: Service[] = [
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

export const OPEN_ROLES = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: 'We are looking for a skilled Frontend Developer to create exceptional user interfaces using React, Next.js, and modern web technologies.',
    requirements: [
      'Strong proficiency in React.js and Next.js',
      'Experience with TypeScript and modern JavaScript',
      'Knowledge of responsive design and CSS frameworks',
      'Understanding of web performance optimization',
      'Minimum 2 years of relevant experience'
    ]
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: 'Seeking a Backend Developer to build robust and scalable server-side applications using Node.js and modern backend technologies.',
    requirements: [
      'Strong experience with Node.js and Express.js',
      'Proficiency in database design and ORM tools',
      'Knowledge of API design and REST principles',
      'Understanding of cloud services (AWS/GCP)',
      'Minimum 2 years of relevant experience'
    ]
  },
  {
    id: 'ui-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
    description: 'Looking for a creative UI/UX Designer to craft beautiful and intuitive user experiences for web and mobile applications.',
    requirements: [
      'Strong portfolio demonstrating UI/UX projects',
      'Proficiency in Figma, Adobe XD, or similar tools',
      'Understanding of user-centered design principles',
      'Experience with design systems',
      'Minimum 2 years of relevant experience'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Remote',
    description: 'Seeking a Digital Marketing Specialist to drive our online presence and growth through various digital channels.',
    requirements: [
      'Experience with SEO, SEM, and social media marketing',
      'Knowledge of analytics tools and data-driven marketing',
      'Content creation and marketing automation skills',
      'Understanding of conversion optimization',
      'Minimum 2 years of relevant experience'
    ]
  }
];