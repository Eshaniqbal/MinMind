"use client";

import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, MessageSquare, Phone, HelpCircle, Briefcase, Clock, Mail, Code2, Users, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { processQuery } from '@/lib/bot-service';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const serviceOptions = [
  {
    icon: Briefcase,
    title: "Web Development",
    description: "Custom websites and web applications",
    content: "Our web development services include:\n\n• Custom Website Development\n• E-commerce Solutions\n• Web Applications\n• Progressive Web Apps (PWA)\n• Website Maintenance\n\nWould you like to know more about any specific service?",
    suggestions: ["Tell me about Mobile Development", "Tell me about Cloud Solutions"]
  },
  {
    icon: Code2,
    title: "Mobile Development",
    description: "iOS and Android applications",
    content: "Our mobile development services include:\n\n• Native iOS Development\n• Native Android Development\n• Cross-platform Apps\n• App Maintenance\n• App Store Optimization\n\nWould you like to know more about any specific service?",
    suggestions: ["Tell me about Web Development", "Tell me about UI/UX Design"]
  },
  {
    icon: Settings,
    title: "Cloud Solutions",
    description: "Cloud infrastructure and services",
    content: "Our cloud solutions include:\n\n• Cloud Migration\n• Cloud Infrastructure Setup\n• Serverless Architecture\n• Cloud Security\n• Cloud Optimization\n\nWould you like to know more about any specific service?",
    suggestions: ["Tell me about Web Development", "Tell me about Mobile Development"]
  },
  {
    icon: Users,
    title: "UI/UX Design",
    description: "User interface and experience design",
    content: "Our UI/UX design services include:\n\n• User Interface Design\n• User Experience Design\n• Wireframing\n• Prototyping\n• Design Systems\n\nWould you like to know more about any specific service?",
    suggestions: ["Tell me about Web Development", "Tell me about Cloud Solutions"]
  },
  {
    icon: HelpCircle,
    title: "Get a Quote",
    description: "Request pricing information",
    content: "To get a quote, you can:\n\n1. Fill out our quote form\n2. Schedule a consultation\n3. Contact us directly\n\nWould you like to proceed with any of these options?",
    suggestions: ["Contact Us", "Tell me about Web Development"]
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: "Get in touch with our team",
    content: "You can reach us through:\n\n📱 WhatsApp: +91 6006223504\n📧 Email: contact@minmind.com\n🌐 Website: www.minmind.com\n\nOur team typically responds within 24 hours.",
    suggestions: ["Get a Quote", "Tell me about UI/UX Design"]
  }
];

const webDevelopmentSuggestions = [
  "Custom Website Development",
  "E-commerce Solutions",
  "Web Applications",
  "Progressive Web Apps (PWA)",
  "Website Maintenance"
];

const mobileDevelopmentSuggestions = [
  "Native iOS Development",
  "Native Android Development",
  "Cross-platform Apps",
  "App Maintenance",
  "App Store Optimization"
];

const cloudSolutionsSuggestions = [
  "Cloud Migration",
  "Cloud Infrastructure Setup",
  "Serverless Architecture",
  "Cloud Security",
  "Cloud Optimization"
];

const uiUxDesignSuggestions = [
  "User Interface Design",
  "User Experience Design",
  "Wireframing",
  "Prototyping",
  "Design Systems"
];

const getAQuoteSuggestions = [
  "Fill out our quote form",
  "Schedule a consultation",
  "Contact us directly"
];

const contactUsSuggestions = [
  "Chat on WhatsApp",
  "Send an email",
  "Visit website"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  // Add a ref to the input field to track focus
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Adjust the layout when the input is focused
  useEffect(() => {
    const handleFocus = () => {
      if (window.innerWidth <= 768) { // Check if it's a mobile device
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  const handleServiceClick = (service: typeof serviceOptions[0]) => {
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: `Tell me about ${service.title}`,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowMenu(false);

    // Show typing indicator
    setIsTyping(true);

    // Add bot response after a short delay
    setTimeout(() => {
      const suggestions = (() => {
        switch (service.title) {
          case "Web Development":
            return [...new Set([...webDevelopmentSuggestions, "Contact Us"])]
          case "Mobile Development":
            return [...new Set([...mobileDevelopmentSuggestions, "Contact Us"])]
          case "Cloud Solutions":
            return [...new Set([...cloudSolutionsSuggestions, "Contact Us"])]
          case "UI/UX Design":
            return [...new Set([...uiUxDesignSuggestions, "Contact Us"])]
          case "Get a Quote":
            return [...new Set([...getAQuoteSuggestions, "Contact Us"])]
          case "Contact Us":
            return contactUsSuggestions;
          default:
            return service.suggestions;
        }
      })();

      const botMessage: Message = {
        id: messages.length + 2,
        content: `Would you like to know more about any specific service?`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setShowMenu(false);

    // Show typing indicator
    setIsTyping(true);

    // Process the query and get bot response
    setTimeout(() => {
      const botResponse = processQuery(userMessage.content);
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Require double-click to send the message
    if (inputMessage === suggestion) {
      handleSendMessage();
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '916006223504';
    const message = 'Hello! I would like to chat with you.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset chat when closed
      setMessages([]);
      setShowMenu(true);
    }
  };

  return (
    <Sheet onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle>Our Services</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-4">
            <div className="flex flex-col h-[calc(100vh-12rem)]">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {showMenu && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {serviceOptions.map((service) => (
                        <Card
                          key={service.title}
                          className="cursor-pointer hover:bg-muted/50 transition-colors hover:shadow-xl hover:shadow-blue-400/70"
                          onClick={() => handleServiceClick(service)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <service.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{service.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div
                        className={`flex items-start gap-3 ${
                          message.sender === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-line shadow-md transition-transform transform hover:scale-105 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                              : 'bg-white text-gray-800'
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      {message.sender === 'bot' && message.suggestions && (
                        <div className="mt-2 ml-12 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-3 justify-start animate-pulse">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-100" />
                          <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="flex gap-2 pt-4">
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="whatsapp" className="mt-4">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-6">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Phone className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat on WhatsApp</h3>
              <p className="text-muted-foreground mb-6">
                Get in touch with us directly through WhatsApp for quick responses and support.
              </p>
              <Button onClick={handleWhatsAppClick} size="lg" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Start WhatsApp Chat
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
} 