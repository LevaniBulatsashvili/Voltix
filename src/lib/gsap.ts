import gsap from "gsap";

/**
 * GSAP core — import from here so animation code stays in one place.
 * Vite resolves `gsap` to `node_modules/gsap/dist/gsap.min.js` (see `vite.config.ts`).
 * Register plugins from `gsap/dist/<Plugin>.min.js` only where needed to keep payload small.
 */
export { gsap };
export default gsap;
