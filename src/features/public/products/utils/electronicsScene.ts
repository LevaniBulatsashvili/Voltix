import gsap from "gsap";
import { animateSlider, cutElectronic } from "./slider";

const CLIP_ENTER = [
  "inset(0% 0% 0% 100%)",
  "inset(0% 0% 0% 40%)",
  "inset(0% 0% 0% 45%)",
  "inset(0% 0% 0% 0%)",
];

function animateElectronic(
  wrapper: HTMLElement,
  duration: number,
  layerIndex: number,
): gsap.core.Timeline {
  const electronic = wrapper.querySelector<HTMLElement>(".electronic");
  if (!electronic) return gsap.timeline();

  const isFirst = layerIndex === 7;

  gsap.set(electronic, { zIndex: layerIndex });

  const tl = gsap.timeline();

  if (isFirst) {
    gsap.set(electronic, { x: -15, y: -10 });
    tl.to(electronic, { x: 0, y: 0, opacity: 1, duration: 1 });
  } else {
    tl.set(electronic, { opacity: 1, clipPath: CLIP_ENTER[0] })
      .to(electronic, { opacity: 1, clipPath: CLIP_ENTER[1], duration: 0.4 })
      .to(electronic, { opacity: 1, clipPath: CLIP_ENTER[2], duration: 0.2 })
      .to(electronic, { opacity: 1, clipPath: CLIP_ENTER[3], duration: 0.4 });
  }

  tl.set({}, { duration: duration - 1 });

  return tl;
}

export function electronicsScene(
  wrapper: HTMLElement,
  slider: HTMLElement,
  duration: number,
  layerIndex: number,
): gsap.core.Timeline {
  const containerWidth = wrapper.offsetWidth;

  const tl = gsap.timeline();

  tl.add(animateElectronic(wrapper, duration, layerIndex));

  if (layerIndex !== 0)
    tl.add(
      [animateSlider(slider, containerWidth), cutElectronic(wrapper)],
      duration,
    );
  else tl.to({}, { duration: duration - 1 });

  return tl;
}
