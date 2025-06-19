"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NAV_LINKS } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (label: string) => {
    setOpenSections(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const DesktopNavLink = ({ item }: { item: NavItem }) => {
    if (item.items) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "text-sm font-medium transition-all duration-300 h-9 px-4 rounded-full gap-1.5 group",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "text-foreground hover:text-primary hover:bg-accent/10"
              )}
            >
              {item.icon && (
                <item.icon 
                  className={cn(
                    "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                    pathname === item.href ? "text-primary-foreground" : "text-primary"
                  )} 
                />
              )}
              {item.label}
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-300",
                "group-hover:translate-y-0.5",
                "group-data-[state=open]:rotate-180"
              )} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            className="w-56 p-2 backdrop-blur-lg bg-background/95 border-border/40"
          >
            {item.items.map((subItem) => (
              <DropdownMenuItem 
                key={subItem.href}
                asChild
                className="group"
              >
                <Link
                  href={subItem.href}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-300",
                    pathname === subItem.href 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent/10 hover:text-primary"
                  )}
                >
                  {subItem.icon && (
                    <subItem.icon 
                      className={cn(
                        "mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                        pathname === subItem.href ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                      )} 
                    />
                  )}
                  {subItem.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button
        variant={pathname === item.href ? "default" : "ghost"}
        asChild
        className={cn(
          "text-sm font-medium transition-all duration-300 h-9 px-4 rounded-full group",
          pathname === item.href 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : item.highlight
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "text-foreground hover:text-primary hover:bg-accent/10"
        )}
      >
        <Link href={item.href} className="flex items-center gap-1.5">
          {item.icon && (
            <item.icon 
              className={cn(
                "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                pathname === item.href || item.highlight ? "text-primary-foreground" : "text-primary"
              )} 
            />
          )}
          {item.label}
        </Link>
      </Button>
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500",
      isScrolled 
        ? "bg-background/95 shadow-lg backdrop-blur-md border-b border-border/40" 
        : "bg-background/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center text-primary hover:text-primary/90 transition-colors group" 
            aria-label="Home"
          >
            <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <DesktopNavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-accent/10"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right"
              className="w-full max-w-xs p-0 bg-background/95 backdrop-blur-lg"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <SheetHeader className="p-4 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10">
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      <SheetTitle className="text-lg font-semibold">
                        Menu
                      </SheetTitle>
                    </div>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto py-4 px-4">
                  <nav className="space-y-2">
                    {NAV_LINKS.map((item) => (
                      <div key={item.href} className="space-y-2">
                        {item.items ? (
                          <div className="space-y-2">
                            <Button
                              variant="ghost"
                              className="w-full justify-between text-left font-medium"
                              onClick={() => toggleSection(item.label)}
                            >
                              <span className="flex items-center gap-2">
                                {item.icon && <item.icon className="h-4 w-4 text-primary" />}
                                {item.label}
                              </span>
                              <ChevronDown className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                openSections.includes(item.label) && "rotate-180"
                              )} />
                            </Button>
                            {openSections.includes(item.label) && (
                              <div className="pl-4 space-y-1">
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                      "flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors",
                                      pathname === subItem.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent/10 hover:text-primary"
                                    )}
                                  >
                                    {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors",
                              pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : item.highlight
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground hover:bg-accent/10 hover:text-primary"
                            )}
                          >
                            {item.icon && <item.icon className="h-4 w-4" />}
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border/40">
                  <p className="text-xs text-muted-foreground text-center">
                    © {new Date().getFullYear()} MinMind Digital Solutions
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
