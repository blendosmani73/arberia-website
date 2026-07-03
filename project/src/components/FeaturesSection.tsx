import { motion } from 'framer-motion';
import { Award, DollarSign, Truck, Headphones, Package, ShieldCheck, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Kualitet i lartë i Materialeve',
    description: 'Të gjitha produktet tona plotësojnë standarde të rrepta cilësie dhe janë të certifikuara sipas normave ndërkombëtare.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Prices',
    description: '“Çmimet më të mira në treg me mundësi fleksibile pagese për porosi me shumicë.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery available across Kosovo with our reliable transport fleet.',
  },
  {
    icon: Headphones,
    title: 'Professional Service',
    description: 'Expert consultation and support throughout your entire project.',
  },
  {
    icon: Package,
    title: 'Large Product Stock',
    description: 'Extensive inventory ensuring immediate availability of all materials.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Supplier',
    description: 'Over 10 years of reliable service to construction companies across Kosovo.',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: '-50px' }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="relative h-full glass rounded-2xl p-8 overflow-hidden"
      >
        {/* Animated border on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl gradient-border" />
        </div>

        {/* Content */}
        <div className="relative">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-gold-500/20 flex items-center justify-center mb-6 group-hover:from-orange-500/40 group-hover:to-gold-500/40 transition-colors"
          >
            <Icon className="w-7 h-7 text-orange-500" />
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <ArrowRight className="w-5 h-5 text-orange-500" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="why-us" className="relative bg-charcoal-900 section-padding overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-orange-500 text-sm uppercase tracking-[0.3em] font-medium">
            Why Choose Us
          </span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            The Arberia Advantage
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Built on a foundation of quality, reliability, and customer satisfaction.
            We're committed to being your trusted construction partner.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
