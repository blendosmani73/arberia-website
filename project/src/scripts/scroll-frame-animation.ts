import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollFrameAnimationOptions = {
  section: HTMLElement;
  pinElement: HTMLElement;
  canvasContainer: HTMLElement;
  canvas: HTMLCanvasElement;
  frameUrls: string[];
  /** Viewport heights of scroll distance; scales with frame count when omitted */
  scrollMultiplier?: number;
};

function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve) => {
          const image = new Image();
          image.decoding = 'async';
          image.onload = () => resolve(image);
          image.onerror = () => resolve(image);
          image.src = url;
        }),
    ),
  );
}

function getScrollDistance(frameCount: number, multiplier?: number): number {
  const baseMultiplier = multiplier ?? Math.max(3, frameCount / 75);
  return window.innerHeight * baseMultiplier;
}

function setupCanvas(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
): CanvasRenderingContext2D | null {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = container.clientWidth;
  const height = container.clientHeight;

  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';

  return context;
}

function drawFrame(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
): void {
  context.fillStyle = '#0d0d0d';
  context.fillRect(0, 0, width, height);

  if (!image.naturalWidth || !image.naturalHeight) return;

  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth: number;
  let drawHeight: number;

  if (imageRatio > canvasRatio) {
    drawWidth = width;
    drawHeight = width / imageRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imageRatio;
  }

  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function initScrollFrameAnimation({
  section,
  pinElement,
  canvasContainer,
  canvas,
  frameUrls,
  scrollMultiplier,
}: ScrollFrameAnimationOptions): () => void {
  if (frameUrls.length === 0) {
    return () => {};
  }

  let scrollTrigger: ScrollTrigger | null = null;
  let cancelled = false;
  let currentFrame = 0;
  let frames: HTMLImageElement[] = [];
  let context: CanvasRenderingContext2D | null = null;

  const renderFrame = (index: number) => {
    if (!context || !frames[index]) return;

    currentFrame = index;
    drawFrame(context, frames[index], canvasContainer.clientWidth, canvasContainer.clientHeight);
  };

  const handleResize = () => {
    context = setupCanvas(canvas, canvasContainer);
    if (context) {
      renderFrame(currentFrame);
    }
    ScrollTrigger.refresh();
  };

  window.addEventListener('resize', handleResize);

  preloadImages(frameUrls).then((loadedFrames) => {
    if (cancelled) return;

    frames = loadedFrames;
    context = setupCanvas(canvas, canvasContainer);
    renderFrame(0);

    const state = { frame: 0 };
    let lastFrame = -1;

    const timeline = gsap.to(state, {
      frame: frameUrls.length - 1,
      ease: 'none',
      snap: 'frame',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDistance(frameUrls.length, scrollMultiplier)}`,
        scrub: true,
        pin: pinElement,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const index = Math.min(
          frameUrls.length - 1,
          Math.max(0, Math.round(state.frame)),
        );

        if (index !== lastFrame) {
          renderFrame(index);
          lastFrame = index;
        }
      },
    });

    scrollTrigger = timeline.scrollTrigger ?? null;
    ScrollTrigger.refresh();
  });

  return () => {
    cancelled = true;
    window.removeEventListener('resize', handleResize);
    scrollTrigger?.kill();
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });
  };
}
