import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Truck, Users, Package } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'A decade of excellence in construction materials',
  },
  {
    icon: Truck,
    value: 5000,
    suffix: '+',
    label: 'Deliveries',
    description: 'Successful deliveries across Kosovo',
  },
  {
    icon: Users,
    value: 1000,
    suffix: '+',
    label: 'Satisfied Customers',
    description: 'Happy clients and growing',
  },
  {
    icon: Package,
    value: 50,
    suffix: '+',
    label: 'Products',
    description: 'Wide range of construction materials',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="text-center p-8 md:p-10 glass rounded-2xl h-full">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-gold-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-gold-500/30 transition-colors"
        >
          <Icon className="w-8 h-8 text-orange-500" />
        </motion.div>

        {/* Counter */}
        <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        </div>

        {/* Label */}
        <h3 className="text-xl font-semibold text-white mb-2">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm">
          {stat.description}
        </p>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-gold-500 rounded-b-2xl"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

export default function StatisticsSection() {
  return (
    <section className="relative bg-charcoal-950 section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 80, 255, 0.5) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-orange-500 text-sm uppercase tracking-[0.3em] font-medium">
            Our Impact
          </span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            Numbers That Speak
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Our track record demonstrates our commitment to excellence and customer satisfaction.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
