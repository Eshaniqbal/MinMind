interface BotResponse {
  message: string;
  suggestions?: string[];
}

interface QueryPattern {
  pattern: RegExp;
  response: (query: string) => BotResponse;
}

const commonQueries: QueryPattern[] = [
  // Greetings
  {
    pattern: /^(hi|hello|hey|greetings|good (morning|afternoon|evening))$/i,
    response: () => ({
      message: "Hello! I'm your AI assistant. How can I help you today?",
      suggestions: [
        "Tell me about your services",
        "How can I get a quote?",
        "What are your working hours?",
        "Contact information"
      ]
    })
  },
  
  // Services
  {
    pattern: /(services|what do you do|what can you do|offerings)/i,
    response: () => ({
      message: "We offer a wide range of services including:\n\n" +
        "• Web Development\n" +
        "• Mobile App Development\n" +
        "• Cloud Solutions\n" +
        "• UI/UX Design\n" +
        "• Digital Marketing\n\n" +
        "Would you like to know more about any specific service?",
      suggestions: [
        "Web Development details",
        "Mobile App Development",
        "Cloud Solutions",
        "UI/UX Design"
      ]
    })
  },

  // Pricing
  {
    pattern: /(price|cost|pricing|how much|quote|budget)/i,
    response: () => ({
      message: "Our pricing varies based on project requirements and scope. To get an accurate quote, you can:\n\n" +
        "1. Fill out our quote form\n" +
        "2. Schedule a consultation\n" +
        "3. Contact us directly\n\n" +
        "Would you like me to help you with any of these options?",
      suggestions: [
        "Get a quote",
        "Schedule consultation",
        "Contact sales"
      ]
    })
  },

  // Contact
  {
    pattern: /(contact|reach|get in touch|email|phone|address)/i,
    response: () => ({
      message: "You can reach us through:\n\n" +
        "📱 WhatsApp: +91 6006223504\n" +
        "📧 Email: contact@minmind.com\n" +
        "🌐 Website: www.minmind.com\n\n" +
        "Our team typically responds within 24 hours.",
      suggestions: [
        "Chat on WhatsApp",
        "Send an email",
        "Visit website"
      ]
    })
  },

  // Working Hours
  {
    pattern: /(working hours|business hours|office hours|when are you open)/i,
    response: () => ({
      message: "Our working hours are:\n\n" +
        "Monday - Friday: 9:00 AM - 6:00 PM IST\n" +
        "Saturday: 10:00 AM - 4:00 PM IST\n" +
        "Sunday: Closed\n\n" +
        "We're available for emergency support 24/7.",
      suggestions: [
        "Schedule a meeting",
        "Contact support",
        "Book a consultation"
      ]
    })
  },

  // Projects
  {
    pattern: /(projects|portfolio|work|examples|showcase)/i,
    response: () => ({
      message: "We've completed numerous successful projects across various industries. You can view our portfolio at:\n\n" +
        "www.minmind.com/projects\n\n" +
        "Would you like to see specific examples in any particular domain?",
      suggestions: [
        "Web Development projects",
        "Mobile App projects",
        "UI/UX Design projects"
      ]
    })
  },

  // Technology Stack
  {
    pattern: /(technology|tech stack|framework|tools|platform)/i,
    response: () => ({
      message: "We work with modern technologies including:\n\n" +
        "Frontend: React, Next.js, Vue.js\n" +
        "Backend: Node.js, Python, Java\n" +
        "Mobile: React Native, Flutter\n" +
        "Cloud: AWS, Azure, Google Cloud\n" +
        "Database: MongoDB, PostgreSQL, MySQL\n\n" +
        "Would you like to know more about any specific technology?",
      suggestions: [
        "Frontend technologies",
        "Backend technologies",
        "Mobile development"
      ]
    })
  },

  // Support
  {
    pattern: /(help|support|issue|problem|trouble)/i,
    response: () => ({
      message: "I'm here to help! Please describe your issue, and I'll guide you to the right solution. You can also:\n\n" +
        "1. Contact our support team\n" +
        "2. Check our FAQ section\n" +
        "3. Schedule a support call\n\n" +
        "What would you like to do?",
      suggestions: [
        "Contact support",
        "View FAQ",
        "Schedule support call"
      ]
    })
  }
];

// Fallback response for unrecognized queries
const fallbackResponse: BotResponse = {
  message: "I'm not sure I understand. Could you please rephrase your question? You can ask me about:\n\n" +
    "• Our services\n" +
    "• Pricing and quotes\n" +
    "• Contact information\n" +
    "• Working hours\n" +
    "• Projects and portfolio\n" +
    "• Technology stack\n" +
    "• Support and help",
  suggestions: [
    "Tell me about services",
    "How to get a quote",
    "Contact information"
  ]
};

export function processQuery(query: string): BotResponse {
  // Clean and normalize the query
  const cleanQuery = query.trim().toLowerCase();

  // Check for exact matches first
  for (const { pattern, response } of commonQueries) {
    if (pattern.test(cleanQuery)) {
      return response(cleanQuery);
    }
  }

  // If no exact match, check for partial matches
  for (const { pattern, response } of commonQueries) {
    if (cleanQuery.includes(pattern.source.replace(/[^a-z]/gi, ''))) {
      return response(cleanQuery);
    }
  }

  // If no matches found, return fallback response
  return fallbackResponse;
} 