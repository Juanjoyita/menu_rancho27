"use client";

import { useEffect, useRef } from "react";

// Fondo animado de brasas y chispas que suben, dibujado en <canvas> sin librerías.
// - Menos partículas y menor resolución en celulares.
// - Se pausa cuando la pestaña no está visible.
// - Con "reducir movimiento" activado muestra un cuadro quieto.
// - Arranca cuando el navegador está libre, para no retrasar la carga.

type Particle = {
  kind: "ember" | "spark"; // brasa (grande y lenta) o chispa (pequeña y rápida)
  x: number;
  y: number;
  vx: number; // velocidad en px/s
  vy: number;
  size: number;
  life: number; // segundos vividos
  maxLife: number;
  phase: number; // fase del vaivén y del parpadeo
};

type RGB = [number, number, number];

// Color según la edad de la partícula: 0 = recién nacida, 1 = a punto de apagarse.
const FIRE_STOPS: [number, RGB][] = [
  [0, [255, 236, 160]], // amarillo claro
  [0.3, [255, 184, 60]], // amarillo-naranja
  [0.6, [255, 110, 25]], // naranja
  [1, [190, 35, 15]], // rojo brasa
];

function fireColor(t: number): RGB {
  for (let i = 1; i < FIRE_STOPS.length; i++) {
    const [end, to] = FIRE_STOPS[i];
    if (t <= end) {
      const [start, from] = FIRE_STOPS[i - 1];
      const k = (t - start) / (end - start);
      return from.map((c, j) => Math.round(c + (to[j] - c) * k)) as RGB;
    }
  }
  return FIRE_STOPS[FIRE_STOPS.length - 1][1];
}

const SPRITE_COUNT = 24;
const SPRITE_SIZE = 64;

// Dibuja una vez un "sello" de luz por cada tono de fuego. Luego solo se copian,
// que es mucho más rápido que crear un degradado por partícula en cada cuadro.
function createSprites() {
  return Array.from({ length: SPRITE_COUNT }, (_, i) => {
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = SPRITE_SIZE;
    const ctx = sprite.getContext("2d")!;
    const [r, g, b] = fireColor(i / (SPRITE_COUNT - 1));
    const core = [r, g, b].map((c) => Math.round(c + (255 - c) * 0.6)).join(",");
    const half = SPRITE_SIZE / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, `rgba(${core},1)`);
    gradient.addColorStop(0.15, `rgba(${r},${g},${b},0.9)`);
    gradient.addColorStop(0.4, `rgba(${r},${g},${b},0.25)`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    return sprite;
  });
}

export function FireBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sprites: HTMLCanvasElement[] = [];
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let speedScale = 1;
    let maxParticles = 0;
    let time = 0;
    let lastFrame = 0;
    let frameId = 0;
    let running = false;
    let resizeId = 0;

    const spawn = (anywhere: boolean): Particle => {
      const kind = Math.random() < 0.35 ? "spark" : "ember";
      // La mayoría nace cerca del centro (como una fogata) y algunas en cualquier punto.
      const spread = Math.random() + Math.random() - 1; // entre -1 y 1, más probable cerca de 0
      const x = Math.random() < 0.3 ? Math.random() * width : width * (0.5 + spread * 0.45);
      const maxLife = kind === "spark" ? 1.2 + Math.random() * 1.4 : 3 + Math.random() * 4;
      return {
        kind,
        x,
        y: anywhere ? Math.random() * height : height + 10 + Math.random() * 30,
        vx: (Math.random() - 0.5) * 20,
        vy: -(kind === "spark" ? 200 + Math.random() * 260 : 35 + Math.random() * 70) * speedScale,
        size: kind === "spark" ? 1 + Math.random() * 1.5 : 2.2 + Math.random() * 4,
        life: anywhere ? Math.random() * maxLife : 0,
        maxLife,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isPhone = width < 768;
      // Resolución limitada: en pantallas muy densas no se nota y cuesta mucho.
      const dpr = Math.min(window.devicePixelRatio || 1, isPhone ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      speedScale = Math.max(0.6, height / 900);
      const fewCores = (navigator.hardwareConcurrency ?? 4) <= 4;
      maxParticles = Math.round((isPhone ? 70 : 160) * (fewCores ? 0.7 : 1));
      while (particles.length < maxParticles) particles.push(spawn(true));
      particles.length = maxParticles;
    };

    const update = (dt: number) => {
      // Viento suave que cambia de dirección lentamente.
      const wind = Math.sin(time * 0.3) * 14 + Math.sin(time * 0.83 + 1.3) * 8;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife || p.y < -40) {
          particles[i] = spawn(false);
          continue;
        }
        const isSpark = p.kind === "spark";
        p.phase += dt * (isSpark ? 7 : 2.2);
        p.vx += (wind - p.vx) * dt * 0.6;
        if (isSpark) p.vy *= 1 - 0.7 * dt; // las chispas pierden impulso
        else p.vy -= 6 * dt * speedScale; // las brasas suben cada vez un poco más
        p.x += (p.vx + Math.sin(p.phase) * (isSpark ? 35 : 18)) * dt;
        p.y += p.vy * dt;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // "lighter" suma la luz: donde se cruzan partículas brilla más, como el fuego.
      ctx.globalCompositeOperation = "lighter";

      // Resplandor de la fogata abajo, con un parpadeo leve.
      const flicker = 0.8 + Math.sin(time * 5.3) * 0.08 + Math.sin(time * 13.1) * 0.05;
      const glow = ctx.createRadialGradient(width / 2, height + 40, 0, width / 2, height + 40, height * 0.55);
      glow.addColorStop(0, `rgba(255,120,30,${0.35 * flicker})`);
      glow.addColorStop(1, "rgba(255,60,10,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.fillRect(0, height * 0.35, width, height * 0.65);

      for (const p of particles) {
        const t = p.life / p.maxLife;
        const fadeIn = Math.min(1, t / 0.08);
        let alpha = fadeIn * (1 - t) ** 1.3;
        if (p.kind === "ember") alpha *= 0.7 + 0.3 * Math.sin(p.phase * 3);
        if (alpha <= 0.01) continue;

        const sprite = sprites[Math.min(SPRITE_COUNT - 1, Math.floor(t * SPRITE_COUNT))];
        ctx.globalAlpha = alpha;

        if (p.kind === "spark") {
          // Estela: línea hacia atrás según la velocidad.
          const [r, g, b] = fireColor(t);
          ctx.strokeStyle = `rgb(${r},${g},${b})`;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.06, p.y - p.vy * 0.06);
          ctx.stroke();
        }
        const d = p.size * (p.kind === "spark" ? 7 : 10);
        ctx.drawImage(sprite, p.x - d / 2, p.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05); // evita saltos tras una pausa
      lastFrame = now;
      time += dt;
      update(dt);
      draw();
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden || reducedMotion.matches) return;
      running = true;
      lastFrame = performance.now();
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const onMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        draw(); // cuadro quieto
      } else {
        start();
      }
    };

    const onResize = () => {
      cancelAnimationFrame(resizeId);
      resizeId = requestAnimationFrame(() => {
        resize();
        if (!running) draw();
      });
    };

    const init = () => {
      sprites = createSprites();
      resize();
      draw();
      canvas.style.opacity = "1"; // aparece suavemente (transición en CSS)
      start();
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.addEventListener("change", onMotionChange);
    };

    // Espera a que el navegador termine lo importante antes de empezar.
    // Safari antiguo no tiene requestIdleCallback: ahí se usa un pequeño retraso.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle ? window.requestIdleCallback(init, { timeout: 1500 }) : setTimeout(init, 200);

    return () => {
      if (hasIdle) window.cancelIdleCallback(idleId as number);
      else clearTimeout(idleId);
      stop();
      cancelAnimationFrame(resizeId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Resplandor cálido fijo: se ve desde el primer instante, incluso sin JavaScript. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_100%,rgba(234,88,12,0.45),rgba(154,52,18,0.2)_45%,transparent_75%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      />
      {/* Viñeta: oscurece los bordes para centrar la mirada. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_45%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
