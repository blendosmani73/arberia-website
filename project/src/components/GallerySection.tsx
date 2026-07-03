import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Concrete blocks construction site',
    category: 'Concrete',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Steel reinforcement bars',
    category: 'Steel',
    span: 'col-span-1',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Construction materials warehouse',
    category: 'Warehouse',
    span: 'col-span-1',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Delivery truck on road',
    category: 'Logistics',
    span: 'col-span-2',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Modern building construction',
    category: 'Projects',
    span: 'col-span-1',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/1118490/pexels-photo-1118490.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Red clay bricks',
    category: 'Blocks',
    span: 'col-span-1',
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Construction site overview',
    category: 'Projects',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cement bags storage',
    category: 'Cement',
    span: 'col-span-1',
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Industrial building',
    category: 'Projects',
    span: 'col-span-1',
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="relative bg-charcoal-900 section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm uppercase tracking-[0.3em] font-medium">
            Galleria
          </span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            Puna jonë & Produktet
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Eksploro protofilin tonë të shërbimeve, produkeve dhe infrastrukturës përreth Kosovës.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${image.span}`}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                <span className="text-orange-500 text-xs uppercase tracking-wider mb-1">
                  {image.category}
                </span>
                <p className="text-white text-sm font-medium">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/95 backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-orange-500 text-sm uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <p className="text-white text-lg font-medium mt-1">
                  {selectedImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
