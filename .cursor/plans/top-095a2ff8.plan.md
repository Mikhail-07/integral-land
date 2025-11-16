<!-- 095a2ff8-4017-4de0-900f-77acab33ef2d b3b4844b-3c11-4fe2-b09b-689ab1532329 -->
# TopView GSAP refactor: master timeline + scrub + snap

## Scope

- Replace per-slide triggers/timeouts with a single master GSAP timeline (5 labels).
- Drive it via one ScrollTrigger: `scrub: 0.6`, `pin`, and `snap` to slide labels.
- Use precise `end` to avoid extra scroll: `(N - 1) * window.innerHeight`.
- Maintain points/lines/arrows positioning via refresh/resize hooks; remove `setTimeout` chains.
- Keep scroll-only UX (no Prev/Next controls).

## Steps

1. Initial states

   - Keep existing gsap.set initial styles (transforms, opacity, sizes) in one init block inside `gsap.context`.

2. Master timeline

   - `const tl = gsap.timeline({ paused: true })`.
   - Add labels `slide-1..slide-5` and migrate animations from `runSlide1..5` to `tl` with relative offsets instead of timeouts.
   - Ensure each reveal/hide is reversible (transform/opacity), no `once`.

3. ScrollTrigger

   - Create a single ST with animation binding and snap-by-labels:
```js
const labels = ["slide-1","slide-2","slide-3","slide-4","slide-5"];

ScrollTrigger.create({
  trigger: containerRef.current,
  pin: stageRef.current,
  start: "top top",
  end: () => `+=${(labels.length - 1) * window.innerHeight}`,
  animation: tl,
  scrub: 0.6,
  invalidateOnRefresh: true,
  snap: {
    snapTo: "labels",           // optionally "labelsDirectional" after testing
    duration: { min: 0.2, max: 0.6 },
    ease: "power1.out"
  },
  onRefreshInit: updateAllPositions,
  onRefresh: updateAllPositions,
  onUpdate: throttledUpdatePositions,
});

const updateAllPositions = () => {
  updatePointsAndLinesPosition();
  updateArrowsPosition();
};

let rafId = 0;
const throttledUpdatePositions = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    updateAllPositions();
  });
};
```

   - Note: keep default `pinSpacing` first; if layout shows unwanted spacer/gap, switch to `pinSpacing: false` and re-validate `end`.

4. Positions maintenance

   - Add `ResizeObserver` on `imageRef` and call `updateAllPositions(); ScrollTrigger.refresh()` on size changes.
   - Also trigger updates after image `onLoad` and in `onRefresh` as above.
```js
useEffect(() => {
  if (!imageRef.current) return;
  const ro = new ResizeObserver(() => {
    updateAllPositions();
    ScrollTrigger.refresh();
  });
  ro.observe(imageRef.current);
  return () => ro.disconnect();
}, []);
```


5. Cleanup DOM/refs

   - Remove slide marker refs and 5 bottom `<section>` placeholders; remove `timeoutsRef` and all `runSlideN` functions.
   - Keep `gsap.context` and on unmount call `ctx.revert()`; ensure no stray triggers remain.

6. Mobile/dvh handling

   - Retain `100dvh` fallback to `100vh` detection; keep `isMobile()` branches for scales/positions.

7. Reduced motion

   - Detect `prefers-reduced-motion` and disable scrub/snap (or greatly reduce motion), falling back to simple fades/transforms or a static view.

## Acceptance checks

- Smooth scrub and snap to nearest slide; reverse scroll reverses all animations cleanly.
- No extra scroll beyond 4×100vh for 5 slides.
- Points/lines/arrows remain correctly attached across refresh/resize/mobile.
- No timing drift vs. current visuals; no layout gaps due to pin spacer.
- Reduced-motion mode respects user preference.

### To-dos

- [ ] Create master GSAP timeline with 5 labeled slides
- [ ] Port runSlide1..5 animations into timeline with reversible sequences
- [ ] Attach ScrollTrigger with scrub and snap to label positions
- [ ] Wire ResizeObserver and ScrollTrigger refresh/update hooks
- [ ] Remove slide refs, timeout logic, and marker sections from JSX
- [ ] Preserve mobile-specific scales/positions and verify on touch devices
- [ ] Manually verify snap, reverse scroll, and layout across breakpoints