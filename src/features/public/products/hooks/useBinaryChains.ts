import { useEffect, useRef } from "react";

const CONTAINER_HEIGHT = 531;
const SEGMENT_HEIGHT = 120;
const SEGMENT_GAP = 2;
const STEP = SEGMENT_HEIGHT + SEGMENT_GAP;
const SEGMENTS = Math.ceil((CONTAINER_HEIGHT * 2) / STEP);
const GAP_CHANCE = 0.1;

export function useBinaryChains() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const id = requestAnimationFrame(() => {
      import("gsap").then(({ gsap }) => {
        const containerWidth = container.offsetWidth;

        const createStream = (x: number) => {
          const segments: HTMLDivElement[] = [];
          for (let i = 0; i < SEGMENTS; i++) {
            const el = document.createElement("div");
            el.className = [
              "absolute",
              "w-1",
              "h-20",
              "bg-green-400",
              "rounded-sm",
              "will-change-transform",
              "pointer-events-none",
            ].join(" ");
            const phase = Math.random() * CONTAINER_HEIGHT * 2;
            gsap.set(el, {
              x,
              y: i * STEP - phase,
              opacity: Math.random() > GAP_CHANCE ? 0.05 : 0,
            });
            container.appendChild(el);
            segments.push(el);
          }
          return segments;
        };

        const animateStream = (
          segments: HTMLDivElement[],
          speed: number,
          streamDelay: number,
        ) => {
          const ribbonHeight = SEGMENTS * STEP;
          segments.forEach((el) => {
            const startY = Number(gsap.getProperty(el, "y"));
            const distanceLeft = CONTAINER_HEIGHT + STEP - startY;
            const initialDuration =
              (distanceLeft / (CONTAINER_HEIGHT + STEP)) * speed;
            const segmentDelay = streamDelay + Math.random() * 0.4;
            const loop = () => {
              const visible = Math.random() > GAP_CHANCE;
              gsap.set(el, {
                y: -(ribbonHeight - CONTAINER_HEIGHT),
                opacity: visible ? 0.05 : 0,
              });
              gsap.to(el, {
                y: CONTAINER_HEIGHT + STEP,
                duration: speed,
                ease: "none",
                onComplete: loop,
              });
            };
            gsap.to(el, {
              y: CONTAINER_HEIGHT + STEP,
              duration: Math.max(initialDuration, 0.1),
              ease: "none",
              delay: segmentDelay,
              onComplete: loop,
            });
          });
        };

        const spacingArr = [
          containerWidth / 40,
          containerWidth / 6,
          containerWidth / 3.3,
          containerWidth / 2.1,
          containerWidth / 1.7,
          containerWidth / 1.4,
          containerWidth / 1.17,
          containerWidth / 1.02,
        ];

        spacingArr.forEach((spacing) => {
          animateStream(createStream(spacing), 11, Math.random() * 2);
        });
      });
    });

    return () => {
      cancelAnimationFrame(id);
      container.innerHTML = "";
    };
  }, []);

  return { containerRef };
}
