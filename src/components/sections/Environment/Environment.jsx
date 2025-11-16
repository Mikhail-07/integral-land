import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// LQIP импорты для всех изображений Environment
import envAirportImg from "../../../assets/images/environment/env_airport.webp?lqip"
import envAirport2Img from "../../../assets/images/environment/env_airport_2.webp?lqip"
import envTheatreImg from "../../../assets/images/environment/env_theatre.webp?lqip"
import envTheatre2Img from "../../../assets/images/environment/env_theatre_2.webp?lqip"
import envPortImg from "../../../assets/images/environment/env_port.webp?lqip"
import envPort2Img from "../../../assets/images/environment/env_port_2.webp?lqip"

gsap.registerPlugin(ScrollTrigger)

const REVEAL_DELAY_MS = 500

const panels = [
  {
    id: "airport",
    base: envAirportImg,
    overlay: envAirport2Img,
    alt: "Airport",
    title: "Аэропорт",
    description: "Разграничение зон на территории, периметр, АВК, КДП, ВВЛ",
    position: "left-4 top-4 md:right-10 md:bottom-20 md:top-auto md:left-auto",
  },
  {
    id: "station",
    base: envTheatreImg,
    overlay: envTheatre2Img,
    alt: "Station",
    title: "Вокзал",
    description: "Станция. Привокзальная территория",
    position: "left-4 top-4 md:left-30 md:bottom-20 md:top-auto ",
  },
  {
    id: "port",
    base: envPortImg,
    overlay: envPort2Img,
    alt: "Port",
    title: "Морской порт",
    description: "Администрация, спецслужбы",
    position: "left-4 top-4 md:right-30 md:bottom-20 md:top-auto md:left-auto",
  },
]

export default function Environment() {
  const containerRef = useRef(null)
  const ctxRef = useRef(null)
  const timeoutsRef = useRef([]) // если нужна задержка для мобильных, и т.д.
  const [loadedImages, setLoadedImages] = useState(new Set())

  const onImageLoad = (imageId) => {
    setLoadedImages((prev) => new Set([...prev, imageId]))
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // helpers
    const clearAllTimeouts = () => {
      if (!timeoutsRef.current.length) return
      for (const id of timeoutsRef.current) clearTimeout(id)
      timeoutsRef.current = []
    }
    const schedule = (fn, delay = 0) => {
      const id = globalThis.setTimeout(fn, delay)
      timeoutsRef.current.push(id)
    }

    // Анимация появления оверлея (персистентная — больше не прячем).
    const revealOverlay = (overlay, panelId = "unknown") => {
      console.log(`[Environment] revealOverlay called for panel ${panelId}`)

      // guard: если уже помечен — ничего не делать
      if (!overlay || overlay.dataset.revealed === "true") {
        console.log(
          `[Environment] revealOverlay: Skipping panel ${panelId} - already revealed or no overlay`
        )
        return
      }

      console.log(
        `[Environment] revealOverlay: Starting animation for panel ${panelId}`
      )

      // убиваем возможные твинги и анимируем в видимую стадию
      gsap.killTweensOf(overlay)
      gsap.to(overlay, {
        opacity: 1,
        visibility: "visible",
        duration: 0.8,
        ease: "power2.out",
        onStart: () => {
          console.log(
            `[Environment] revealOverlay: Animation started for panel ${panelId}`
          )
        },
        onComplete: () => {
          console.log(
            `[Environment] revealOverlay: Animation completed for panel ${panelId}`
          )
          // пометка, чтобы не сбрасывать/перезаписывать позже
          overlay.dataset.revealed = "true"
          // ставим inline-стили в финальное состояние (чтобы другие операции не прятали)
          overlay.style.opacity = "1"
          overlay.style.visibility = "visible"
        },
      })
    }

    // Возвращает долю видимой высоты элемента в пределах viewport (0..1)
    const getVisibleRatio = (element) => {
      const rect = element.getBoundingClientRect()
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight
      const elementHeight = Math.max(1, rect.height)
      const visiblePx = Math.max(
        0,
        Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top)
      )
      const ratio = Math.min(
        1,
        visiblePx / Math.min(elementHeight, viewportHeight)
      )
      return { ratio, rect, viewportHeight }
    }

    // Запускает отложенное появление после достижения 50% видимости секции
    const startDelayedRevealIfHalfPassed = (
      overlay,
      self,
      panelId,
      sectionEl
    ) => {
      const { ratio } = getVisibleRatio(sectionEl)

      const nearHalf = ratio >= 0.4 && ratio <= 0.6
      if (nearHalf) {
        console.log(
          `[Environment] Panel ${panelId}: visibleRatio=${ratio.toFixed(
            3
          )}, progress=${self.progress.toFixed(3)}, revealed=${
            overlay.dataset.revealed
          }, timerStarted=${overlay.dataset.timerStarted}`
        )
      }

      if (!overlay || overlay.dataset.revealed === "true") {
        if (nearHalf) {
          console.log(
            `[Environment] Panel ${panelId}: Skipping - already revealed`
          )
        }
        return
      }

      if (overlay.dataset.timerStarted === "true") {
        if (!overlay.dataset.loggedTimerStarted) {
          console.log(
            `[Environment] Panel ${panelId}: Timer already started, skipping`
          )
          overlay.dataset.loggedTimerStarted = "true"
        }
        return
      }

      if (ratio >= 0.5) {
        console.log(
          `[Environment] Panel ${panelId}: ✅ visibleRatio >= 0.5 (${ratio.toFixed(
            3
          )}), starting timer with delay ${REVEAL_DELAY_MS}ms`
        )
        overlay.dataset.timerStarted = "true"
        schedule(() => {
          console.log(
            `[Environment] Panel ${panelId}: ⏰ Timer fired, revealing overlay`
          )
          revealOverlay(overlay, panelId)
        }, REVEAL_DELAY_MS)
      }
    }

    // Контекст GSAP — безопасный откат при unmount
    const ctx = gsap.context(() => {
      // Устанавливаем начальное состояние: все оверлеи скрыты (перед тем как показать нужный)
      const allOverlays = el.querySelectorAll(".env-overlay")
      gsap.set(allOverlays, { opacity: 0, visibility: "hidden" })

      // Создаём ScrollTrigger для каждой панели.
      const sections = el.querySelectorAll(".env-panel")
      sections.forEach((section, index) => {
        const overlay = section.querySelector(".env-overlay")
        if (!overlay) return

        const panelId = panels[index]?.id || `panel-${index}`
        console.log(
          `[Environment] Creating ScrollTrigger for panel ${panelId} (index ${index})`
        )

        ScrollTrigger.create({
          id: `env-panel-${index}`,
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            startDelayedRevealIfHalfPassed(overlay, self, panelId, section)
          },
          onEnter: (self) => {
            console.log(
              `[Environment] Panel ${panelId}: onEnter triggered, progress=${self.progress.toFixed(
                3
              )}`
            )
          },
          // anticipatePin и refreshPriority оставляем как было в вашей логике
          anticipatePin: 1,
          refreshPriority: -1,
          invalidateOnRefresh: true,
        })
      })

      console.log(`[Environment] Created ${sections.length} ScrollTriggers`)
    }, el)

    ctxRef.current = ctx

    // Пересчёт триггеров после создания и после загрузки изображений
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      clearAllTimeouts()
      if (ctxRef.current) ctxRef.current.revert() // уберёт слушатели ScrollTrigger
    }
  }, [])

  // После загрузки картинок пересчитываем ScrollTrigger (вы уже имели это)
  useEffect(() => {
    if (loadedImages.size) {
      ScrollTrigger.refresh()
    }
  }, [loadedImages])

  return (
    <section
      id="environment"
      ref={containerRef}
      className="w-full relative z-10"
    >
      {panels.map((p) => {
        const baseLoaded = loadedImages.has(`${p.id}-base`)
        const overlayLoaded = loadedImages.has(`${p.id}-overlay`)

        return (
          <div
            key={p.id}
            className="env-panel relative w-full h-[33.33vh] md:h-[100svh] min-h-[200px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
            style={{ contain: "layout" }}
          >
            {/* Предзагрузка реальных изображений */}
            <img
              src={p.base.src}
              alt=""
              className="hidden"
              onLoad={() => onImageLoad(`${p.id}-base`)}
            />
            <img
              src={p.overlay.src}
              alt=""
              className="hidden"
              onLoad={() => onImageLoad(`${p.id}-overlay`)}
            />

            {/* Базовое изображение (LQIP -> full) */}
            <img
              src={baseLoaded ? p.base.src : p.base.lqip}
              alt={p.alt}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              style={{
                filter: baseLoaded ? "none" : "blur(12px)",
                transition: "filter 0.35s ease",
              }}
              loading="lazy"
            />

            {/* Overlay (тот самый оверлей, который должен остаться видимым после появления) */}
            <img
              src={overlayLoaded ? p.overlay.src : p.overlay.lqip}
              alt={p.alt + " overlay"}
              className="env-overlay absolute inset-0 w-full h-full object-cover z-20 transition-all duration-300"
              style={{
                filter: overlayLoaded ? "none" : "blur(12px)",
                transition: "filter 0.35s ease",
                opacity: 0,
                visibility: "hidden",
              }}
              loading="lazy"
              // NOTE: data-revealed будет устанавливаться при анимации в revealOverlay
              data-revealed="false"
            />

            {/* Карточка с информацией */}
            <div className={`absolute z-30 max-w-xs ${p.position}`}>
              <div className="bg-[rgba(14,64,63,0.75)] backdrop-blur-sm p-2 md:p-6">
                <h3 className="text-white text-lg md:text-2xl font-bold mb-1">
                  {p.title}
                </h3>
                <p
                  className="text-xs md:text-sm leading-relaxed"
                  style={{ color: "var(--color-grey-1)" }}
                >
                  {p.description}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
