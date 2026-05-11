import { useEffect, useRef } from "react";

const CONTAINER_HEIGHT = 531;
const SEGMENT_HEIGHT = 40;
const GAP_CHANCE = 0.1;
const NUM_STREAMS = 20;

interface Stream {
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

export function useBinaryChains() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 w-full h-full pointer-events-none";
    canvas.width = container.offsetWidth;
    canvas.height = CONTAINER_HEIGHT;
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    let animFrameId: number;

    const streams: Stream[] = Array.from({ length: NUM_STREAMS }, (_, i) => ({
      x: (canvas.width / (NUM_STREAMS - 1)) * i,
      y: Math.random() * CONTAINER_HEIGHT,
      speed: 1.2 + Math.random() * 0.8,
      opacity: Math.random() > GAP_CHANCE ? 0.07 : 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streams.forEach((stream) => {
        if (stream.opacity === 0) {
          stream.y += stream.speed;
          if (stream.y > CONTAINER_HEIGHT) {
            stream.y = -SEGMENT_HEIGHT;
            stream.opacity = Math.random() > GAP_CHANCE ? 0.07 : 0;
          }
          return;
        }

        ctx.fillStyle = `rgba(74, 222, 128, ${stream.opacity})`;
        ctx.fillRect(stream.x - 2, stream.y, 4, SEGMENT_HEIGHT);

        stream.y += stream.speed;
        if (stream.y > CONTAINER_HEIGHT) {
          stream.y = -SEGMENT_HEIGHT;
          stream.opacity = Math.random() > GAP_CHANCE ? 0.07 : 0;
        }
      });

      animFrameId = requestAnimationFrame(draw);
    };

    const rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animFrameId);
      canvas.remove();
    };
  }, []);

  return { containerRef };
}
