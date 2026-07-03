import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Truck, MapPin, Clock, Package } from 'lucide-react';

export default function LogisticsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const truckX = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const features = [
    { icon: Clock, label: '24/7 Service' },
    { icon: MapPin, label: 'All Kosovo' },
    { icon: Package, label: 'Bulk Orders' },
  ];

  return (
    <section
      id="logistics-section"
      ref={containerRef}
      className="relative min-h-[120vh] bg-charcoal-950 overflow-hidden"
    >
      {/* Industrial background */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: bgOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 80, 255, 0.1) 0%, transparent 60%),
              linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)
            `,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Industrial silhouettes */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 1000 100"
        >
          <path
            d="M0,100 L0,60 L30,60 L30,40 L50,40 L50,60 L80,60 L80,30 L100,30 L100,60 L150,60 L150,50 L170,50 L170,60 L200,60 L200,20 L220,20 L220,60 L250,60 L250,40 L270,40 L270,60 L300,60 L300,30 L320,30 L320,60 L350,60 L350,50 L370,50 L370,60 L400,60 L400,25 L420,25 L420,60 L450,60 L450,40 L470,40 L470,60 L500,60 L500,35 L520,35 L520,60 L550,60 L550,45 L570,45 L570,60 L600,60 L600,30 L620,30 L620,60 L650,60 L650,50 L670,50 L670,60 L700,60 L700,20 L720,20 L720,60 L750,60 L750,40 L770,40 L770,60 L800,60 L800,35 L820,35 L820,60 L850,60 L850,55 L870,55 L870,60 L900,60 L900,30 L920,30 L920,60 L950,60 L950,45 L970,45 L970,60 L1000,60 L1000,100 Z"
            fill="currentColor"
            className="text-orange-500"
          />
        </svg>
      </motion.div>

      {/* Main content */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Truck illustration */}
            <motion.div
              className="relative"
              style={{ x: truckX }}
            >
              {/* Truck SVG */}
              <div className="relative w-full max-w-lg mx-auto">
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 80, 255, 0.3))' }}
                >
                  {/* Truck body */}
                  <rect x="50" y="50" width="200" height="100" rx="5" fill="#2a2a2a" />
                  <rect x="55" y="55" width="190" height="90" rx="3" fill="#3a3a3a" />

                  {/* Truck cabin */}
                  <path
                    d="M250,50 L320,50 L340,80 L340,150 L250,150 Z"
                    fill="#333"
                  />
                  <path
                    d="M255,55 L315,55 L330,80 L330,145 L255,145 Z"
                    fill="#444"
                  />

                  {/* Windows */}
                  <path
                    d="M260,60 L305,60 L320,85 L320,100 L260,100 Z"
                    fill="rgba(0, 80, 255, 0.3)"
                    stroke="rgba(0, 80, 255, 0.6)"
                    strokeWidth="1"
                  />

                  {/* Headlights */}
                  <circle cx="335" cy="100" r="5" fill="#0050FF" />

                  {/* Wheels */}
                  <circle cx="100" cy="160" r="30" fill="#1a1a1a" stroke="#333" strokeWidth="5" />
                  <circle cx="100" cy="160" r="15" fill="#333" />
                  <circle cx="280" cy="160" r="30" fill="#1a1a1a" stroke="#333" strokeWidth="5" />
                  <circle cx="280" cy="160" r="15" fill="#333" />

                  {/* Company branding */}
                  <text
                    x="150"
                    y="110"
                    fill="#0050FF"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    ARBERIA
                  </text>

                  {/* Cargo lines */}
                  <line x1="70" y1="70" x2="230" y2="70" stroke="#555" strokeWidth="2" />
                  <line x1="70" y1="85" x2="230" y2="85" stroke="#555" strokeWidth="2" />
                  <line x1="70" y1="100" x2="230" y2="100" stroke="#555" strokeWidth="2" />
                  <line x1="70" y1="115" x2="230" y2="115" stroke="#555" strokeWidth="2" />
                  <line x1="70" y1="130" x2="230" y2="130" stroke="#555" strokeWidth="2" />
                </svg>

                {/* Dust particles */}
                <motion.div
                  className="absolute bottom-0 -left-10 w-20 h-10"
                  animate={{
                    opacity: [0, 0.5, 0],
                    x: [-10, -30],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-gray-500/30 to-transparent blur-md rounded-full" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Truck className="w-12 h-12 text-orange-500 mb-6 mx-auto md:mx-0" />
              </motion.div>

              <span className="text-orange-500 text-sm uppercase tracking-[0.3em] mb-4 block font-medium">
                Logistics & Delivery
              </span>

              <h2 className="heading-lg text-white mb-6">
                Fast Delivery Across Kosovo
              </h2>

              <p className="text-body mb-8">
                Our reliable transport fleet ensures your construction materials arrive on time,
                every time. With dedicated logistics operations across all of Kosovo,
                we provide swift and secure delivery services.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-sm font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Request Delivery Quote
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
