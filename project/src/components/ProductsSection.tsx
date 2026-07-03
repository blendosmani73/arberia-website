import { motion } from 'framer-motion';
import { Blocks, BrickWall, BarChart3, Circle, Cylinder, Mountain, ArrowRight } from 'lucide-react';

const products = [
  {
    icon: Blocks,
    title: 'Blloka Betoni',
    description: 'Blloka betoni me rezistencë të lartë për çdo nevojë ndërtimi. Të disponueshme në madhësi dhe cilësi të ndryshme.',
    color: 'from-gray-500 to-gray-600',
  },
  {
    icon: BrickWall,
    title: 'Red Clay Blocks',
    description: 'Traditional red clay blocks with excellent thermal insulation properties.',
    color: 'from-red-400 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Reinforcement Steel',
    description: 'Premium fertraj steel bars meeting international quality standards.',
    color: 'from-orange-400 to-orange-500',
  },
  {
    icon: Circle,
    title: 'Cement',
    description: 'High-quality Portland cement for all concrete mixing applications.',
    color: 'from-slate-300 to-slate-400',
  },
  {
    icon: Cylinder,
    title: 'Concrete Pipes',
    description: 'Durable concrete pipes for drainage, sewage, and infrastructure projects.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Mountain,
    title: 'Construction Aggregates',
    description: 'Crushed stone, gravel, and sand for foundation work and concrete production.',
    color: 'from-amber-600 to-amber-700',
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative h-full glass rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-gold-500/0 group-hover:from-orange-500/10 group-hover:to-gold-500/10 transition-all duration-500" />

        {/* Top accent line */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative p-8">
          {/* Icon */}
          <motion.div
            className="relative w-16 h-16 mb-6"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-2 text-orange-500 font-medium text-sm"
            whileHover={{ x: 5 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-20 blur-xl -z-10`}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="relative bg-charcoal-950 section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/0 via-charcoal-900/50 to-charcoal-900/0" />
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
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-orange-500 text-sm uppercase tracking-[0.3em] font-medium"
          >
            Our Products
          </motion.span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            Premium Construction Materials
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            From foundation to finish, we provide everything you need for your construction project.
            All products meet the highest quality standards.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary"
          >
            View Full Catalog
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
