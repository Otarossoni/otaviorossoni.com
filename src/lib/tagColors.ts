// Hue and chroma per tag. Lightness comes from the --tag-l token, so the same
// tag reads well on both themes.
export const TAG_DOT_COLORS: Record<string, [hue: number, chroma: number]> = {
  react: [215, 0.09],
  typescript: [250, 0.09],
  go: [200, 0.08],
  nextjs: [270, 0.01],
  nodejs: [145, 0.1],
  mongodb: [160, 0.09],
  express: [135, 0.05],
  fastify: [90, 0.02],
  redis: [25, 0.1],
  desktop: [180, 0.07],
  cli: [95, 0.09],
  dsa: [50, 0.1],
  algorithms: [0, 0.09],
  cleancode: [125, 0.09],
  educational: [235, 0.07],
  tech: [255, 0.06],
  misc: [70, 0.09],
  tailwindcss: [205, 0.08],
};

export function tagDotColor(tag: string): string {
  const [hue, chroma] = TAG_DOT_COLORS[tag] ?? [0, 0];
  return `oklch(var(--tag-l) ${chroma} ${hue})`;
}
