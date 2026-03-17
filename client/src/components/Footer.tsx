import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const quickLinks = [
    { href: "/", label: "Home", scrollTop: true },
    { href: "/products", label: "Products & Services", scrollTop: true },
    { href: "/about", label: "About Us", scrollTop: true },
    { href: "/gallery", label: "Gallery", scrollTop: true },
    { href: "/contact", label: "Contact", scrollTop: true },
  ];

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Jain Furnishing Studio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A new studio with years of experience in furnishing and foam solutions. Trusted by thousands across Mumbai.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/jain_furnishing_studio"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-instagram"
              >
                <Button variant="outline" size="icon" className="hover-elevate">
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>
              <a
                href="tel:08976360450"
                data-testid="link-footer-phone-button"
              >
                <Button variant="outline" size="icon" className="hover-elevate">
                  <Phone className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => link.scrollTop && window.scrollTo(0, 0)}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground" data-testid="text-address">
                  Shop no. 8, Poonam Residency, 103/104, Srishti Rd, near Poonam Estate Cluster, Co-Operative Housing Society, Gaurav Galaxy, Mira Road East, Mira Bhayandar, Maharashtra 401107
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a
                  href="tel:08976360450"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-phone"
                >
                  08976360450
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <a
                  href="mailto:jainfurnishingstudio@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  jainfurnishingstudio@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground" data-testid="text-hours">
                  Everyday: 10:00 AM - 11:00 PM
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="rounded-lg overflow-hidden border h-48 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7531.942335336082!2d72.86315939509394!3d19.283620004782215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1acd92a2895%3A0x11c296868593bfcc!2sJain%20Furnishing%20Studio%20-%20Mattress%2C%20Curtains%2C%20Sofa%2C%20Wallpaper%2C%20Carpets!5e0!3m2!1sen!2sin!4v1773763711472!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jain Furnishing Studio Location"
                data-testid="map-footer"
              />
              <a
                href="https://maps.app.goo.gl/CP1ZE3kZ1AtoPgVj6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 cursor-pointer hover:bg-black/10 transition-colors"
                title="Click to view Jain Furnishing Studio in Google Maps"
              />
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jain Furnishing Studio. All rights reserved. | Years of Experience in Furnishing Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
