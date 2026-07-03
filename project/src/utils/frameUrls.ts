type FrameModuleMap = Record<string, string>;

function extractFrameNumber(path: string): number {
  const match = path.match(/(\d+)\.(jpg|jpeg|png|webp)$/i);
  return match ? parseInt(match[1], 10) : 0;
}

export function getSortedFrameUrls(modules: FrameModuleMap): string[] {
  return Object.keys(modules)
    .sort((a, b) => extractFrameNumber(a) - extractFrameNumber(b))
    .map((key) => modules[key]);
}

export function loadAnimationFrames(): string[] {
  const modules = import.meta.glob('../animation/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }) as FrameModuleMap;

  return getSortedFrameUrls(modules);
}
