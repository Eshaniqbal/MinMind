import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // Intentionally commented out due to previous 'module not found' error
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { APP_NAME } from '@/lib/constants';
import { ChatInterface } from '@/components/chat-interface';
import { WelcomePopup } from '@/components/welcome-popup';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'MinMind : Building modern, responsive websites and delivering projects.',
  icons: {
    icon: '/logo1.png',
    apple: '/logo1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} font-sans antialiased flex flex-col min-h-screen bg-background`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
        <ChatInterface />
        <WelcomePopup />
      </body>
    </html>
  );
}
