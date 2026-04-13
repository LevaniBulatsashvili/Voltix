import gsap from "gsap";

export function animateSlider(
  sliderEl: HTMLElement,
  containerWidth: number,
): gsap.core.Timeline {
  const sliderWidth = 18;
  const withWithoutSlider = containerWidth - sliderWidth;
  gsap.set(sliderEl, { x: withWithoutSlider });

  return gsap
    .timeline()
    .to(sliderEl, {
      x: withWithoutSlider * 0.4,
      duration: 0.4,
      opacity: 1,
    })
    .to(sliderEl, { x: withWithoutSlider * 0.45, duration: 0.2 })
    .to(sliderEl, { x: -40, duration: 0.4 })
    .to(sliderEl, { opacity: 0 })
    .set(sliderEl, { x: withWithoutSlider });
}

export function cutElectronic(wrapper: HTMLElement): gsap.core.Timeline {
  const electronic = wrapper.querySelector<HTMLElement>(".electronic");

  return gsap
    .timeline()
    .to(electronic, { clipPath: "inset(0% 60%  0% 0%)", duration: 0.4 })
    .to(electronic, { clipPath: "inset(0% 55%  0% 0%)", duration: 0.2 })
    .to(electronic, { clipPath: "inset(0% 100% 0% 0%)", duration: 0.4 });
}
