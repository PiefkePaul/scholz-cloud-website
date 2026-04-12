interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  frame: number;
}

export function initHeroCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize(): void {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PARTICLE_COUNT = 40;
  const LINK_DIST = 130;   // max px for particle-to-particle lines
  const MOUSE_DIST = 180;  // max px for lightning-to-cursor

  let mouseX = -9999;
  let mouseY = -9999;

  // Listen on window so the canvas can have pointer-events: none
  window.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      mouseX = x;
      mouseY = y;
    } else {
      mouseX = -9999;
      mouseY = -9999;
    }
  }, { passive: true });

  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 1 + Math.random(),
    opacity: 0.15 + Math.random() * 0.25,
    color: Math.random() > 0.5 ? '#0ea5e9' : '#ffffff',
    frame: 0,
  }));

  let frameCount = 0;

  /** Draw a jagged lightning bolt from (x1,y1) to (x2,y2). */
  function drawLightning(
    x1: number, y1: number,
    x2: number, y2: number,
    alpha: number
  ): void {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 2) return;

    // Normal vector for perpendicular jitter
    const nx = -dy / len;
    const ny = dx / len;

    const jitter = len * 0.15;
    const j1 = (Math.random() - 0.5) * 2 * jitter;
    const j2 = (Math.random() - 0.5) * 2 * jitter;

    const mx1 = x1 + dx * 0.33 + nx * j1;
    const my1 = y1 + dy * 0.33 + ny * j1;
    const mx2 = x1 + dx * 0.67 + nx * j2;
    const my2 = y1 + dy * 0.67 + ny * j2;

    // Glow pass — thick, soft
    ctx!.beginPath();
    ctx!.moveTo(x1, y1);
    ctx!.lineTo(mx1, my1);
    ctx!.lineTo(mx2, my2);
    ctx!.lineTo(x2, y2);
    ctx!.strokeStyle = '#0ea5e9';
    ctx!.lineWidth = 4;
    ctx!.globalAlpha = alpha * 0.12;
    ctx!.stroke();

    // Core pass — thin, bright
    ctx!.beginPath();
    ctx!.moveTo(x1, y1);
    ctx!.lineTo(mx1, my1);
    ctx!.lineTo(mx2, my2);
    ctx!.lineTo(x2, y2);
    ctx!.strokeStyle = '#bae6fd';
    ctx!.lineWidth = 0.8;
    ctx!.globalAlpha = alpha * 0.65;
    ctx!.stroke();
  }

  function tick(): void {
    if (document.hidden) {
      requestAnimationFrame(tick);
      return;
    }

    frameCount++;
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    // ── Particle-to-particle connecting lines ───────────────────────────────
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = '#0ea5e9';
          ctx!.lineWidth = 0.6;
          ctx!.globalAlpha = (1 - dist / LINK_DIST) * 0.2;
          ctx!.stroke();
        }
      }
    }

    // ── Mouse lightning (flickers every other frame for electric look) ───────
    if (mouseX > -999 && frameCount % 2 === 0) {
      for (const p of particles) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 10) {
          drawLightning(p.x, p.y, mouseX, mouseY, 1 - dist / MOUSE_DIST);
        }
      }
    }

    // ── Particles (rendered on top of lines) ─────────────────────────────────
    for (const p of particles) {
      p.frame++;

      if (p.frame % 120 === 0) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.4) {
          p.vx = (p.vx / speed) * 0.4;
          p.vy = (p.vy / speed) * 0.4;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = p.opacity;
      ctx!.fill();
    }

    ctx!.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  tick();
}
