// src/scripts/initLenis.js
import Lenis from 'lenis';

document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis({
    duration: 1.2, // Default: 1.2
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
    direction: 'vertical', // 'vertical' | 'horizontal'
    gestureDirection: 'vertical', // 'vertical' | 'horizontal' | 'both'
    smoothWheel: true, // Default: true
    smoothTouch: false, // Default: false (enables smooth scroll for touch devices)
    wheelMultiplier: 1, // Default: 1
    touchMultiplier: 2, // Default: 2
    autoResize: true, // Default: true
    // You can add more options here: https://github.com/darkroomengineering/lenis#options
  });

  // Optional: Integrate with GSAP ScrollTrigger if you're using it
  // This is crucial for GSAP animations to work correctly with smooth scrolling
  // if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
  //   lenis.on('scroll', window.gsap.ScrollTrigger.update);
  //   window.gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000); // Lenis expects milliseconds
  //   });
  //   window.gsap.ticker.lagSmoothing(0); // Disable lag smoothing for optimal sync
  // } else {
  // If not using GSAP ScrollTrigger, manually run the raf loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  // }

  // You can also expose lenis globally for debugging or other scripts
  // window.lenis = lenis;
});
