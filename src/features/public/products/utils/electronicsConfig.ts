export interface IElectronicItem {
  src: string;
  alt: string;
  duration?: number;
  overlap?: number;
}

export const ELECTRONICS: IElectronicItem[] = [
  { src: "/images/electronics/electronics.webp", alt: "electronics" },
  { src: "/images/electronics/laptop.webp", alt: "laptop" },
  { src: "/images/electronics/tv.webp", alt: "tv" },
  { src: "/images/electronics/tablet.webp", alt: "tablet" },
  { src: "/images/electronics/camera.webp", alt: "camera" },
  { src: "/images/electronics/headphones.webp", alt: "headphones" },
  { src: "/images/electronics/controller.webp", alt: "controller" },
  { src: "/images/electronics/console.webp", alt: "console" },
];

export const SCENE_DURATION = 4.5;
