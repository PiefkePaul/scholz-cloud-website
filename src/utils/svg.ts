export function toMonoSvg(svg: string): string {
  return svg
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\s(style|fill|class)="[^"]*"/gi, '')
    .replace('<svg ', '<svg fill="#ffffff" ');
}
