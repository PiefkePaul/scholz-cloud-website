function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function initCounters(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!elements.length) return;

  const DURATION = 1200;
  // Use document lang for number formatting
  const locale = document.documentElement.lang === 'en' ? 'en-US' : 'de-DE';

  const animate = (el: HTMLElement): void => {
    const raw = el.dataset.counter ?? '0';

    // Non-animating special cases
    if (raw === '24/7') { el.textContent = '24/7'; return; }
    if (raw === '0') { el.textContent = '0'; return; }

    const hasSuffix = raw.endsWith('+');
    const numStr = raw.replace(/[^0-9]/g, '');
    const target = parseInt(numStr, 10);
    const useThousands = target >= 1000;

    const start = performance.now();

    function frame(now: number): void {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const current = Math.round(easeOutQuart(progress) * target);

      let display = useThousands
        ? current.toLocaleString(locale)
        : String(current);
      if (hasSuffix) display += '+';
      el.textContent = display;

      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  };

  // Respect prefers-reduced-motion: skip animation, show final value immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => {
      el.textContent = el.dataset.counter ?? '0';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  elements.forEach((el) => observer.observe(el));
}
