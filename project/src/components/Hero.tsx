import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, HardHat } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const blockRotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const blockRotateY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const blockScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const blockZ = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    if (!blockRef.current) return;

    // Initial animation for the block
    gsap.fromTo(
      blockRef.current,
      { rotateX: -30, rotateY: -45, scale: 0.5, opacity: 0 },
      { rotateX: 0, rotateY: 0, scale: 1, opacity: 1, duration: 2, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  const scrollToNext = () => {
    const element = document.querySelector('#steel-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[200vh] bg-charcoal-950"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden perspective-1000">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-900/50 to-charcoal-950" />

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 80, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 80, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* 3D Concrete Block */}
        <motion.div
          ref={blockRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-style-3d"
          style={{
            rotateX: blockRotateX,
            rotateY: blockRotateY,
            scale: blockScale,
            z: blockZ,
          }}
        >
          {/* Main block container */}
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] transform-style-3d">
            {/* Front face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-lg shadow-2xl"
              style={{
                transform: 'translateZ(50px)',
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), 0 0 80px rgba(0,80,255,0.2)',
              }}
            >
              {/* Concrete texture */}
              <div
                className="absolute inset-0 rounded-lg opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              {/* Logo on block */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-charcoal-900/80 backdrop-blur flex items-center justify-center border border-white/10">
                  <HardHat className="w-10 h-10 md:w-12 md:h-12 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Top face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-lg origin-bottom"
              style={{
                transform: 'rotateX(90deg) translateZ(50px)',
                height: '100px',
                top: '-100px',
              }}
            />

            {/* Right face */}
            <div
              className="absolute bg-gradient-to-br from-gray-500 to-gray-600"
              style={{
                transform: 'rotateY(90deg) translateZ(250px)',
                width: '100px',
                right: '-100px',
                height: '100%',
              }}
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mb-6"
            >
              <span className="text-sm md:text-base uppercase tracking-[0.3em] text-orange-500 font-medium">
                Premium Construction Materials
              </span>
            </motion.div>

            <h1 className="heading-xl text-white mb-6">
              <span className="gradient-text">Arberia</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-body max-w-xl mx-auto px-6"
            >
              Building Kosovo's future with premium quality materials.
              From concrete to steel, we deliver excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
            >
              <button
                onClick={() => {
                  document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Explore Products
              </button>
              <button
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
