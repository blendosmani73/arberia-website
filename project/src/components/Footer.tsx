import { motion } from 'framer-motion';
import { HardHat, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowUp, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'Ballina', href: '#concrete-blocks' },
  { name: 'Produktet', href: '#products' },
  { name: 'Per ne', href: '#why-us' },
  { name: 'Galleria', href: '#gallery' },
  { name: 'Kontakti', href: '#contact' },
];

const products = [
  { name: 'Blloka Betoni', href: '#products' },
  { name: 'Fer-traj', href: '#products' },
  { name: 'Armature', href: '#products' },
  { name: 'Blloka oxhaku', href: '#products' },
  { name: 'Cement', href: '#products' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-charcoal-950 border-t border-white/5">
      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-gold-500 flex items-center justify-center shadow-lg shadow-orange-500/25"
      >
        <ArrowUp className="w-5 h-5 text-charcoal-900" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <motion.a
              href="#concrete-blocks"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-gold-500 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-charcoal-900" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">Arberia</span>
            </motion.a>
            <p className="text-gray-400 leading-relaxed mb-6">
              Ne ofrojmë materiale ndërtimore me cilësi të lartë.
              Me përvojë mbi dy dekada, garantojmë transport të shpejtë dhe të sigurt në çdo qytet të Kosovës.         
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Klikoni</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Produktet</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(product.href);
                    }}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Kontakti</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+38349123456"
                  className="flex items-start gap-3 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>+383 44 394 014</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@arberia-ks.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>blendosmani20@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Industrial Zone, Prishtina, Kosovo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Arberia. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-orange-500 fill-orange-500" /> in Kosovo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
