import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products & Services" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:08976360450"
              className="flex items-center gap-2 hover-elevate px-3 py-1 rounded-md transition-all"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">08976360450</span>
            </a>
            <span className="hidden md:inline text-primary-foreground/80">
              Mon-Sun: 10:00 AM - 11:00 PM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground/80"><b>30+ years of Experience</b></span>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" onClick={() => window.scrollTo(0, 0)} data-testid="link-home">
              <img src="/logo.png" alt="Jain Furnishing Studio Logo" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-foreground">
                  Jain Furnishing Studio
                </span>
                <span className="text-xs text-muted-foreground">
                  Quality Home Furnishings
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => window.scrollTo(0, 0)}>
                  <span
                    className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                      location === link.href
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://www.instagram.com/jain_furnishing_studio/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
              >
                <Button variant="ghost" size="icon" className="hover-elevate">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <Button data-testid="button-enquire">Enquire Now</Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover-elevate"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => { window.scrollTo(0, 0); setMobileMenuOpen(false); }}>
                  <span
                    className={`block py-2 text-base font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="https://www.instagram.com/jain_foam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full" data-testid="button-instagram-mobile">
                    <Instagram className="w-4 h-4 mr-2" />
                    Follow on Instagram
                  </Button>
                </a>
                <Link href="/contact" onClick={() => { window.scrollTo(0, 0); setMobileMenuOpen(false); }}>
                  <Button className="w-full" data-testid="button-enquire-mobile">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
