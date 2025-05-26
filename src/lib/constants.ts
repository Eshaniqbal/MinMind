import type { NavItem, Project, Service, FaqItem } from './types';
import { 
  Home, 
  Info, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  GitBranch, 
  Users, 
  Palette, 
  Bot, 
  Code2, 
  Rocket, 
  Smartphone, 
  BarChart, 
  BookOpen,
  Building2,
  GraduationCap,
  LayoutDashboard,
  Settings,
  HeartHandshake,
  Target,
  Trophy,
  Newspaper
} from 'lucide-react';

export const APP_NAME = "MinMind Digital Solutions";
export const FOUNDER_NAME = "Eshan Iqbal";

export const NAV_LINKS: NavItem[] = [
  { 
    label: 'Home', 
    href: '/', 
    icon: Home 
  },
  { 
    label: 'About', 
    href: '/about', 
    icon: Building2,
    items: [
      { label: 'Company Overview', href: '/about', icon: Info },
      { label: 'Our Team', href: '/about#team', icon: Users },
      { label: 'Careers', href: '/careers', icon: GraduationCap },
      { label: 'Mission & Vision', href: '/about#mission', icon: Target },
      { label: 'Achievements', href: '/about#achievements', icon: Trophy },
    ]
  },
  { 
    label: 'Services', 
    href: '/services', 
    icon: Briefcase,
    items: [
      { label: 'Web Development', href: '/services#web', icon: Code2 },
      { label: 'Mobile Apps', href: '/services#mobile', icon: Smartphone },
      { label: 'UI/UX Design', href: '/services#design', icon: Palette },
      { label: 'Digital Marketing', href: '/services#marketing', icon: BarChart },
      { label: 'Custom Solutions', href: '/services#custom', icon: Settings },
    ]
  },
  { 
    label: 'Projects', 
    href: '/projects', 
    icon: LayoutDashboard,
    items: [
      { label: 'All Projects', href: '/projects', icon: Rocket },
      { label: 'Web Projects', href: '/projects?category=web', icon: Code2 },
      { label: 'Mobile Projects', href: '/projects?category=mobile', icon: Smartphone },
      { label: 'Case Studies', href: '/projects/case-studies', icon: BookOpen },
    ]
  },
  { 
    label: 'Resources', 
    href: '/resources', 
    icon: BookOpen,
    items: [
      { label: 'Blog', href: '/blog', icon: Newspaper },
      { label: 'FAQs', href: '/faq', icon: HelpCircle },
      { label: 'Documentation', href: '/docs', icon: FileText },
      { label: 'Support', href: '/support', icon: HeartHandshake },
    ]
  },
  { 
    label: 'Contact', 
    href: '/contact', 
    icon: MessageSquare 
  },
  { 
    label: 'Get a Quote', 
    href: '/quote', 
    icon: FileText,
    highlight: true
  },
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
    id: 'full-stack-dev',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    description: 'We are looking for a skilled Full Stack Developer proficient in both frontend and backend technologies to build scalable web applications.',
    requirements: [
      'Strong proficiency in React.js, Next.js, and Node.js',
      'Experience with TypeScript and modern JavaScript',
      'Knowledge of database design and ORM tools',
      'Understanding of web performance optimization',
      'Minimum 2 years of relevant experience'
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    description: 'Looking for a creative UI/UX Designer to craft beautiful and intuitive user experiences for web and mobile applications.',
    requirements: [
      'Strong portfolio demonstrating UI/UX projects',
      'Proficiency in Figma, Adobe XD, or similar tools',
      'Understanding of user-centered design principles',
      'Experience with design systems',
      'Strong visual design skills'
    ]
  },
  {
    id: 'growth-social-lead',
    title: 'Growth & Social Media Lead',
    department: 'Marketing',
    location: 'Remote',
    description: 'Seeking a dynamic Growth & Social Media Lead to drive our social media presence and lead growth initiatives across platforms.',
    requirements: [
      'Proven track record in social media management',
      'Experience with growth marketing strategies',
      'Strong analytical and data-driven approach',
      'Content creation and community management skills',
      'Knowledge of social media analytics tools'
    ]
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    department: 'Marketing',
    location: 'Remote',
    description: 'Looking for a talented Content Writer to create engaging and SEO-optimized content for our digital platforms and client projects.',
    requirements: [
      'Excellent writing and editing skills',
      'Experience in SEO content writing',
      'Knowledge of content management systems',
      'Ability to write for different audiences',
      'Strong research and analytical skills'
    ]
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    department: 'Operations',
    location: 'Remote',
    description: 'Join our team as a Customer Support Representative to provide exceptional service and support to our clients.',
    requirements: [
      'Excellent communication skills',
      'Problem-solving abilities',
      'Experience with ticketing systems',
      'Patient and empathetic approach',
      'Basic technical understanding'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    description: 'We are seeking a Product Manager to lead product strategy and development, ensuring successful delivery of user-centric solutions.',
    requirements: [
      'Experience in product management',
      'Strong understanding of user experience',
      'Data-driven decision making skills',
      'Excellent stakeholder management',
      'Agile/Scrum methodology knowledge'
    ]
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Marketing',
    department: 'Marketing',
    location: 'Remote',
    description: 'Looking for an SEO & Marketing specialist to improve our online visibility and implement effective marketing strategies.',
    requirements: [
      'Proven SEO experience',
      'Knowledge of marketing analytics tools',
      'Experience with SEM and PPC',
      'Content strategy skills',
      'Understanding of digital marketing channels'
    ]
  },
  {
    id: 'photographer-editor',
    title: 'Photographer / Editor',
    department: 'Creative',
    location: 'Remote',
    description: 'Optional role for a creative Photographer/Editor to capture and edit high-quality visual content for our projects.',
    requirements: [
      'Professional photography experience',
      'Proficiency in Adobe Creative Suite',
      'Strong photo editing skills',
      'Understanding of brand guidelines',
      'Portfolio of previous work'
    ]
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    department: 'Engineering',
    location: 'Remote',
    description: 'Optional role for a QA Engineer to ensure the quality and reliability of our software products through comprehensive testing.',
    requirements: [
      'Experience in software testing',
      'Knowledge of testing methodologies',
      'Automation testing skills',
      'Bug tracking and reporting',
      'Attention to detail'
    ]
  }
];