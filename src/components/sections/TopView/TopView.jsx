import { useCallback, useEffect, useRef, useState } from "react"
import topViewImage from "../../../assets/images/top-view-no-roof.webp"
import arrowSvg from "../../../assets/images/icons/arrow.svg"
import arrowDownSvg from "../../../assets/images/icons/arrow_down.svg"
import TextBlock from "./TextBlock"
import TextBlock2 from "./TextBlock2"
import TextBlock3 from "./TextBlock3"
import TextBlock4 from "./TextBlock4"
import ConnectorLine from "./ConnectorLine"
import ImagePoint from "./ImagePoint"
import ImageArrow from "./ImageArrow"
import TextBlock5 from "./TextBlock5"
import TextBlock6 from "./TextBlock6"

const GSAP_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
const SCROLL_TRIGGER_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
const SCROLL_TO_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"

const phases = [
  {
    id: "phase-0",
    label: "Discover the silhouette",
    left: 50,
    top: 100,
    description:
      "Poised low and centered for an unmistakable stance that means motion.",
  },
  {
    id: "phase-1",
    label: "Glide to the horizon",
    left: 70,
    top: 85,
    description:
      "Push toward the bright edge with a flourish of precision engineering.",
  },
  {
    id: "phase-2",
    label: "Ascend with ease",
    left: 70,
    top: 15,
    description:
      "Rise to the occasion as the chassis lifts into an aerial vantage point.",
  },
  {
    id: "phase-3",
    label: "Center the future",
    left: 50,
    top: 50,
    description:
      "Settle into balance where performance, design, and innovation converge.",
  },
]

const POINT_POSITIONS = {
  phase2: { xPercent: 25.2, yPercent: 32.5 },
  phase3: { xPercent: 32.5, yPercent: 64 },
}

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error("Missing script source"))
      return
    }

    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        resolve()
        return
      }

      existing.addEventListener("load", () => resolve())
      existing.addEventListener("error", () =>
        reject(new Error(`Failed to load ${src}`))
      )
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true
    script.setAttribute("data-gsap", "true")

    script.onload = () => {
      script.setAttribute("data-loaded", "true")
      resolve()
    }

    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })

const ensureGsap = async (scriptsLoadedRef) => {
  if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
    return
  }

  if (scriptsLoadedRef.current) {
    return
  }

  scriptsLoadedRef.current = true

  await loadScript(GSAP_CDN)
  await Promise.all([loadScript(SCROLL_TRIGGER_CDN), loadScript(SCROLL_TO_CDN)])

  if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
    window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin)
    return
  }

  throw new Error("GSAP or plugins failed to mount on window")
}

const PhaseScroller = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const labelRefs = useRef([])
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)
  const underlineRef2 = useRef(null)
  const underlineRef3 = useRef(null)
  const lineRef2 = useRef(null)
  const lineRef3 = useRef(null)
  const pointRef2 = useRef(null)
  const pointRef3 = useRef(null)
  const arrowRef1 = useRef(null)
  const arrowRef2 = useRef(null)
  const textRef5 = useRef(null)
  const textRef6 = useRef(null)
  const timelineRef = useRef(null)
  const arrowsTimelineRef = useRef(null)
  const scriptsLoadedRef = useRef(false)
  const resizeTimeoutRef = useRef(null)
  const activePhaseRef = useRef(0)
  const isMountedRef = useRef(true)
  const [activePhase, setActivePhase] = useState(0)
  // const [isMobile, setIsMobile] = useState(false)

  const animateLabels = (targetIndex) => {
    if (!isMountedRef.current) {
      return
    }

    const gsap = window.gsap
    if (!gsap || !labelRefs.current.length) {
      return
    }

    labelRefs.current.forEach((label, index) => {
      if (!label) {
        return
      }

      if (index === targetIndex) {
        gsap.to(label, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        return
      }

      gsap.to(label, {
        autoAlpha: 0,
        y: 18,
        duration: 0.4,
        ease: "power2.in",
      })
    })
  }

  const handlePhaseSelect = (index) => {
    if (!timelineRef.current?.scrollTrigger || !window.gsap) {
      return
    }

    const clampedIndex = Math.min(Math.max(index, 0), phases.length - 1)
    const label = `phase-${clampedIndex}`
    const targetScroll = timelineRef.current.scrollTrigger.labelToScroll(label)

    if (typeof targetScroll !== "number") {
      return
    }

    window.gsap.to(window, {
      duration: 0,
      ease: "power2.inOut",
      scrollTo: {
        y: targetScroll,
        autoKill: true,
      },
    })
  }

  const handleKeyNavigation = (event) => {
    if (!sectionRef.current) {
      return
    }

    const { key } = event
    if (
      key !== "ArrowDown" &&
      key !== "ArrowUp" &&
      key !== "PageDown" &&
      key !== "PageUp"
    ) {
      return
    }

    event.preventDefault()

    if (key === "ArrowDown" || key === "PageDown") {
      handlePhaseSelect(activePhaseRef.current + 1)
      return
    }

    handlePhaseSelect(activePhaseRef.current - 1)
  }

  const getScaleForPhase = (index) => {
    const img = imageRef.current
    if (!img) return 1

    const vw = window.innerWidth || document.documentElement.clientWidth || 0
    const vh = window.innerHeight || document.documentElement.clientHeight || 0
    const natW = img.naturalWidth || img.width || 0
    const natH = img.naturalHeight || img.height || 0
    if (!vw || !vh || !natW || !natH) return 1

    // Phase 0: no scaling, image takes 100% width
    if (index === 0) {
      return 1
    }

    // Phases 1 & 2: compute scale so the image's left edge touches the screen's left edge
    if (index === 1 || index === 2) {
      const leftPercent = phases[index]?.left ?? 100
      const clamped = Math.max(0, Math.min(100, leftPercent))
      return (2 * clamped) / 100
    }

    // Phase 3: small scale for mobile screens only
    if (index === 3) {
      const isMobile = vw <= 425
      return isMobile ? 1.5 : 1
    }

    return 1
  }

  const updateArrowTextPositions = useCallback(() => {
    if (!sectionRef.current || !window.gsap) {
      return
    }

    const gsap = window.gsap
    const sectionBox = sectionRef.current.getBoundingClientRect()

    if (arrowRef1.current && textRef5.current) {
      const a1 = arrowRef1.current.getBoundingClientRect()
      const text5Rect = textRef5.current.getBoundingClientRect()
      const isDesktop = window.innerWidth > 768
      gsap.set(textRef5.current, {
        position: "absolute",
        left: a1.right - sectionBox.left + 20,
        top: isDesktop
          ? a1.top - sectionBox.top
          : a1.top - sectionBox.top - text5Rect.height,
      })
    }

    if (arrowRef2.current && textRef6.current) {
      const a2 = arrowRef2.current.getBoundingClientRect()
      const text6Rect = textRef6.current.getBoundingClientRect()
      const isDesktop = window.innerWidth > 768
      gsap.set(textRef6.current, {
        position: "absolute",
        left: a2.left - sectionBox.left - text6Rect.width,
        top: isDesktop
          ? a2.bottom - sectionBox.top - text6Rect.height
          : a2.bottom - sectionBox.top,
      })
    }
  }, [])

  const createAnimation = useCallback(() => {
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger

    if (!isMountedRef.current) {
      return
    }

    if (!sectionRef.current || !imageRef.current || !gsap || !ScrollTrigger) {
      return
    }

    if (timelineRef.current?.scrollTrigger) {
      timelineRef.current.scrollTrigger.kill()
    }
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    gsap.killTweensOf(imageRef.current)
    labelRefs.current.forEach((label) => {
      if (label) {
        gsap.killTweensOf(label)
      }
    })

    // kill tweens of decorations
    gsap.killTweensOf([
      underlineRef2.current,
      underlineRef3.current,
      lineRef2.current,
      lineRef3.current,
      pointRef2.current,
      pointRef3.current,
    ])

    gsap.set(imageRef.current, {
      left: `${phases[0].left}%`,
      top: `${phases[0].top}%`,
      xPercent: -50,
      yPercent: -50,
      width: "100vw",
      height: "auto",
      maxWidth: "none",
      objectFit: "cover",
      transformOrigin: "50% 50%",
      scale: getScaleForPhase(0),
    })

    labelRefs.current.forEach((label, index) => {
      if (!label) {
        return
      }

      gsap.set(label, {
        autoAlpha: index === 0 ? 1 : 0,
        y: index === 0 ? 0 : 18,
      })
    })

    // initialize decorations as hidden
    gsap.set([underlineRef2.current, underlineRef3.current], {
      scaleX: 0,
      transformOrigin: "left center",
    })
    gsap.set([lineRef2.current, lineRef3.current], {
      scaleX: 0,
      opacity: 0,
      transformOrigin: "left center",
    })
    gsap.set([pointRef2.current, pointRef3.current], {
      scale: 0,
      opacity: 0,
    })
    gsap.set(arrowRef1.current, {
      opacity: 0,
      scale: 0.85,
      y: 40, // will animate bottom -> up
    })
    gsap.set(arrowRef2.current, {
      opacity: 0,
      scale: 0.85,
      y: -40, // will animate top -> down
    })
    gsap.set(textRef5.current, {
      opacity: 0,
      y: 40, // bottom -> up
    })
    gsap.set(textRef6.current, {
      opacity: 0,
      y: -40, // top -> down
    })
    if (arrowsTimelineRef.current) {
      arrowsTimelineRef.current.kill()
      arrowsTimelineRef.current = null
    }

    activePhaseRef.current = 0
    if (isMountedRef.current) {
      setActivePhase(0)
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "phase-scroller",
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${sectionRef.current.offsetHeight * (phases.length - 1)}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (phases.length - 1),
          duration: 0,
          delay: 0,
        },
        onUpdate: (self) => {
          if (!self || !isMountedRef.current) {
            return
          }

          const segmentCount = phases.length - 1
          if (segmentCount <= 0) {
            return
          }

          const segmentProgress = self.progress * segmentCount
          const nearestIndex = Math.round(segmentProgress)

          if (nearestIndex === activePhaseRef.current) {
            return
          }

          activePhaseRef.current = nearestIndex
          setActivePhase(nearestIndex)
          gsap.killTweensOf(imageRef.current)
          gsap.to(imageRef.current, {
            left: `${phases[nearestIndex].left}%`,
            top: `${phases[nearestIndex].top}%`,
            scale: getScaleForPhase(nearestIndex),
            duration: 0.6,
            ease: "power3.inOut",
          })
          // toggle decorations for phases 2 and 3
          if (nearestIndex === 1) {
            gsap.to(underlineRef2.current, {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
            })
            gsap.to(lineRef2.current, {
              scaleX: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(pointRef2.current, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.2)",
            })
          } else {
            gsap.to(underlineRef2.current, {
              scaleX: 0,
              duration: 0.25,
              ease: "power2.in",
            })
            gsap.to(lineRef2.current, {
              scaleX: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            })
            gsap.to(pointRef2.current, {
              scale: 0,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
            })
          }
          if (nearestIndex === 2) {
            gsap.to(underlineRef3.current, {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
            })
            gsap.to(lineRef3.current, {
              scaleX: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            })
            gsap.to(pointRef3.current, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.2)",
            })
            /* arrows handled in phase 4 */
          } else {
            gsap.to(underlineRef3.current, {
              scaleX: 0,
              duration: 0.25,
              ease: "power2.in",
            })
            gsap.to(lineRef3.current, {
              scaleX: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            })
            gsap.to(pointRef3.current, {
              scale: 0,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
            })
            /* arrows handled in phase 4 */
          }
          // arrows + texts for phase 4 only
          if (nearestIndex === 3) {
            if (!arrowsTimelineRef.current) {
              const arrowsTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
                onUpdate: updateArrowTextPositions,
                onComplete: updateArrowTextPositions,
              })

              arrowsTimeline
                // first: arrowRef1 + textRef5
                .to(
                  arrowRef1.current,
                  {
                    opacity: 0.85,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                  },
                  0.6
                )
                .to(
                  textRef5.current,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                  },
                  0.6
                )
                // then: arrowRef2 + textRef6 at the end of the sequence
                .to(
                  arrowRef2.current,
                  {
                    opacity: 0.85,
                    scale: 1,
                    y: 0,
                    duration: 0.2,
                  },
                  "+=0.25"
                )
                .to(
                  textRef6.current,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                  },
                  "+=0"
                )

              arrowsTimelineRef.current = arrowsTimeline
            }

            arrowsTimelineRef.current.progress(0).play()
            // Update positions immediately if arrows are already visible
            // This handles the case when timeline is restarted
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                updateArrowTextPositions()
              })
            })
          } else if (arrowsTimelineRef.current) {
            // on reverse scroll: hide arrows & texts with a quick fade
            arrowsTimelineRef.current.pause()
            gsap.to(arrowRef1.current, {
              opacity: 0,
              scale: 0.85,
              y: 40,
              duration: 0.18,
              ease: "power2.in",
            })
            gsap.to(arrowRef2.current, {
              opacity: 0,
              scale: 0.85,
              y: -40,
              duration: 0.18,
              ease: "power2.in",
            })
            gsap.to(textRef5.current, {
              opacity: 0,
              y: 40,
              duration: 0.18,
              ease: "power2.in",
            })
            gsap.to(textRef6.current, {
              opacity: 0,
              y: -40,
              duration: 0.18,
              ease: "power2.in",
            })
          }
          animateLabels(nearestIndex)
        },
      },
    })

    tl.addLabel("phase-0", 0)

    phases.forEach((phase, index) => {
      if (index === 0) {
        return
      }
      tl.addLabel(`phase-${index}`)
    })

    timelineRef.current = tl

    ScrollTrigger.refresh()
  }, [setActivePhase, updateArrowTextPositions])

  const updateAnimationOnResize = useCallback(() => {
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger

    if (!isMountedRef.current) {
      return
    }

    if (!sectionRef.current || !imageRef.current || !gsap || !ScrollTrigger) {
      return
    }

    if (!timelineRef.current?.scrollTrigger) {
      // If timeline doesn't exist, create it
      createAnimation()
      return
    }

    // Update image scale for current phase
    const currentPhase = activePhaseRef.current
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        scale: getScaleForPhase(currentPhase),
      })
    }

    // Update arrow text positions if we're in phase 3
    if (currentPhase === 3) {
      updateArrowTextPositions()
    }

    // Refresh ScrollTrigger to recalculate positions (including end value)
    // ScrollTrigger will automatically recalculate end since it's a function
    ScrollTrigger.refresh()
  }, [createAnimation, updateArrowTextPositions])

  useEffect(() => {
    isMountedRef.current = true

    ensureGsap(scriptsLoadedRef)
      .then(() => {
        if (!isMountedRef.current) {
          return
        }

        createAnimation()
      })
      .catch((error) => {
        console.error("GSAP initialization failed", error)
      })

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) {
          return
        }

        // setIsMobile(computeIsMobile())
        updateAnimationOnResize()
      }, 180)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      isMountedRef.current = false
      window.removeEventListener("resize", handleResize)

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      if (timelineRef.current?.scrollTrigger) {
        timelineRef.current.scrollTrigger.kill()
      }

      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [createAnimation, updateAnimationOnResize])

  return (
    <section
      id="topview"
      ref={sectionRef}
      tabIndex={0}
      aria-label="Interactive vehicle phase explorer"
      onKeyDown={handleKeyNavigation}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      data-active-phase={activePhase}
      style={{ backgroundColor: "#1E1E1E" }}
    >
      <div className="relative h-full w-full py-16 z-17">
        {/* Absolute phase texts */}
        <div
          ref={(node) => {
            labelRefs.current[0] = node
          }}
          className="relative z-16"
        >
          <TextBlock />
        </div>
        <div className="absolute left-10 top-24 z-15">
          <div
            ref={(node) => {
              labelRefs.current[1] = node
              textRef2.current = node
            }}
          >
            <TextBlock2 />
            <div
              ref={underlineRef2}
              className="h-0.5 bg-amber-400 w-full scale-x-0"
            />
          </div>
        </div>
        <div className="absolute left-10 bottom-24 z-14">
          <div
            ref={(node) => {
              labelRefs.current[2] = node
              textRef3.current = node
            }}
          >
            <TextBlock3 />
            <div
              ref={underlineRef3}
              className="h-0.5 bg-amber-400 w-full scale-x-0"
            />
          </div>
        </div>
        <div
          ref={(node) => {
            labelRefs.current[3] = node
          }}
          className="z-13"
        >
          <TextBlock4 />
        </div>
      </div>

      {/* Image container - full width */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src={topViewImage}
          alt="Concept vehicle top view"
          className="absolute w-screen h-auto object-contain max-w-none"
        />
      </div>

      {/* Points + Connector lines */}
      <ImagePoint
        ref={pointRef2}
        imageRef={imageRef}
        xPercent={POINT_POSITIONS.phase2.xPercent}
        yPercent={POINT_POSITIONS.phase2.yPercent}
      />
      <ImagePoint
        ref={pointRef3}
        imageRef={imageRef}
        xPercent={POINT_POSITIONS.phase3.xPercent}
        yPercent={POINT_POSITIONS.phase3.yPercent}
      />
      <ConnectorLine ref={lineRef2} fromRef={textRef2} toRef={pointRef2} />
      <ConnectorLine ref={lineRef3} fromRef={textRef3} toRef={pointRef3} />

      {/* Phase 3: Arrows + adjacent texts */}
      <ImageArrow
        ref={arrowRef1}
        imageRef={imageRef}
        xPercent={46}
        yPercent={50}
        src={arrowSvg}
      />
      <ImageArrow
        ref={arrowRef2}
        imageRef={imageRef}
        xPercent={70}
        yPercent={50}
        src={arrowDownSvg}
      />
      <div ref={textRef5} className="absolute z-30">
        <TextBlock5 />
      </div>
      <div ref={textRef6} className="absolute z-31">
        <TextBlock6 />
      </div>
    </section>
  )
}

export default PhaseScroller
