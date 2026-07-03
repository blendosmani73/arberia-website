import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SteelSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const barRotation = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const barScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  // Generate steel bars
  const bars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    xOffset: (i - 3.5) * 60,
    rotation: Math.random() * 10 - 5,
  }));

  return (
    <section
      id="steel-section"
      ref={containerRef}
      className="relative min-h-[150vh] bg-charcoal-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950" />

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: Math.random() > 0.5 ? 'rgba(0, 80, 255, 0.4)' : 'rgba(102, 163, 255, 0.4)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center perspective-1000">
        {/* Steel bars container */}
        <motion.div
          className="relative transform-style-3d"
          style={{
            rotateY: barRotation,
            scale: barScale,
          }}
        >
          <div className="flex items-end justify-center gap-2 md:gap-3">
            {bars.map((bar, index) => (
              <motion.div
                key={bar.id}
                className="relative"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: bar.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transform: `rotate(${bar.rotation}deg)`,
                }}
              >
                {/* Steel bar */}
                <div
                  className="w-6 md:w-10 lg:w-12 rounded-full relative overflow-hidden shadow-2xl"
                  style={{
                    height: `${200 + index * 30}px`,
                    maxHeight: '400px',
                  }}
                >
                  {/* Bar gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg,
                        #4a4a4a 0%,
                        #8a8a8a 20%,
                        #6a6a6a 40%,
                        #9a9a9a 60%,
                        #7a7a7a 80%,
                        #5a5a5a 100%
                      )`,
                    }}
                  />

                  {/* Metallic shine */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: bar.delay,
                    }}
                  />

                  {/* Ribbing pattern */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-2"
                        style={{
                          background: 'linear-gradient(90deg, #3a3a3a, #5a5a5a, #3a3a3a)',
                          marginTop: '20px',
                        }}
                      />
                    ))}
                  </div>

                  {/* Glowing edge */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,80,255,0.2)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shadow/reflection */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 rounded-full blur-xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,80,255,0.2) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-40 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <span className="text-orange-500 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Fertraj
          </span>
          <h2 className="heading-lg text-white text-center mb-4">
            Strength in Every Structure
          </h2>
          <p className="text-body text-center max-w-2xl">
            Premium quality reinforcement steel bars engineered for maximum durability.
            Our fertraj meets the highest international standards for construction.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
