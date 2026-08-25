function debounce<Args extends unknown[]>(fn: (...args: Args) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

function setupMarquee(wrap: HTMLElement) {
  const track = wrap.querySelector<HTMLElement>('[data-logo-track]');
  if (!track) return;

  const originalChildren = Array.from(track.children);

  const evaluate = () => {
    wrap.classList.remove('is-marquee');
    track.replaceChildren(...originalChildren);

    const overflows = track.scrollWidth > wrap.clientWidth + 1;

    if (!overflows) {
      wrap.style.overflowX = '';
      return;
    }

    wrap.style.overflowX = '';
    const clones = originalChildren.map((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      return clone;
    });
    track.append(...clones);
    wrap.classList.add('is-marquee');
  };

  evaluate();
  if (document.readyState === 'complete') {
    evaluate();
  } else {
    window.addEventListener('load', evaluate, { once: true });
  }
  window.addEventListener('resize', debounce(evaluate, 150));
}

export function initLogoMarquee() {
  document.querySelectorAll<HTMLElement>('[data-logo-marquee]').forEach(setupMarquee);
}
