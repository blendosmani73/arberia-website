import { useEffect, useRef } from 'react';
import { initScrollFrameAnimation } from '../scripts/scroll-frame-animation';
import { loadAnimationFrames } from '../utils/frameUrls';

const frameUrls = loadAnimationFrames();

export default function ConcreteBlocksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    const canvasContainer = canvasContainerRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvasWrapper || !canvasContainer || !canvas || frameUrls.length === 0) {
      return;
    }

    const cleanup = initScrollFrameAnimation({
      section,
      pinElement: canvasWrapper,
      canvasContainer,
      canvas,
      frameUrls,
    });

    return cleanup;
  }, []);

  if (frameUrls.length === 0) {
    return null;
  }

  return (
    <section
      id="concrete-blocks"
      ref={sectionRef}
      className="relative bg-charcoal-950"
      aria-label="Concrete blocks scroll animation"
    >
      <div
        ref={canvasWrapperRef}
        data-frame-canvas
        className="relative h-[100svh] min-h-[480px] w-full flex items-center justify-center overflow-hidden px-4 sm:px-6"
      >
        <div
          ref={canvasContainerRef}
          data-frame-display
          className="relative w-full max-w-[90vw] h-[70svh] sm:h-[80svh]"
        >
          <canvas
            ref={canvasRef}
            data-frame-canvas-element
            className="block w-full h-full"
            aria-label="Concrete blocks production sequence"
          />
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-charcoal-950/40 via-transparent to-charcoal-950/60" />

        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 text-center px-4 sm:px-6 pointer-events-none">
          <span className="text-orange-500 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">
            Concrete Blocks
          </span>
          <h2 className="heading-lg text-white mt-3 sm:mt-4 mb-2 sm:mb-3">Built to Last</h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 max-w-xl mx-auto">
            Scroll to watch the sequence play frame by frame.
          </p>
        </div>
      </div>
    </section>
  );
}
