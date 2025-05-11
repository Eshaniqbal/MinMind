"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { NAV_LINKS } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-background/95 shadow-lg backdrop-blur-md border-b border-border/40" 
        : "bg-background/80 backdrop-blur-sm border-b border-border/20"
    )}>
      <div className="container mx-auto flex h-28 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center text-primary hover:text-primary/90 transition-colors group" 
            aria-label="Home"
          >
            <div className="relative h-24 w-24 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 flex items-center justify-end">
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            {NAV_LINKS.map((item) => (
              <Button
                key={item.label}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
                className={cn(
                  "text-xs font-medium transition-all duration-300 h-8 px-3 rounded-full",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" 
                    : "text-foreground hover:text-primary hover:bg-accent/10",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
              >
                <Link href={item.href}>
                  {item.icon && <item.icon className="mr-1.5 h-3.5 w-3.5" />}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-accent/10" 
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full max-w-xs bg-background/95 backdrop-blur-md border-l border-border/40"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col space-y-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center">
                    <div className="relative h-24 w-24">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Mobile Divider */}
                  <div className="h-px w-full bg-border/40" />

                  {/* Mobile Navigation */}
                  <div className="space-y-1.5">
                    {NAV_LINKS.map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href 
                              ? "bg-primary/10 text-primary" 
                              : "text-foreground hover:bg-accent/10 hover:text-primary"
                          )}
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {/* Mobile CTA Button */}
                  <Button 
                    asChild
                    className="mt-4 w-full h-8 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-md"
                  >
                    <Link href="/quote">Get a Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
