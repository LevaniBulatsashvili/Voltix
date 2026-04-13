import { useEffect, useRef } from "react";
import gsap from "gsap";

const CONTAINER_HEIGHT = 531;
const SEGMENT_HEIGHT = 120;
const SEGMENT_GAP = 2;
const STEP = SEGMENT_HEIGHT + SEGMENT_GAP;
const SEGMENTS = Math.ceil((CONTAINER_HEIGHT * 2) / STEP);
const GAP_CHANCE = 0.1;

export function useBinaryChains() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const createStream = (container: HTMLElement, x: number) => {
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
      const y = i * STEP - phase;

      gsap.set(el, {
        x,
        y,
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

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

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
      const streamDelay = Math.random() * 2;
      const stream = createStream(container, spacing);
      animateStream(stream, 11, streamDelay);
    });

    return () => {
      gsap.killTweensOf(container.querySelectorAll("div"));
      container.innerHTML = "";
    };
  }, []);

  return { containerRef };
}
