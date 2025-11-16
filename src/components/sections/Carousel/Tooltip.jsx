// Tooltip.jsx
import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as Motion from "framer-motion"

export default function Tooltip({ show, title, body, tags = [], anchorEl }) {
  const tooltipRef = useRef(null)
  const [coords, setCoords] = useState({ left: 0, top: 0, placement: "bottom" })
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // внутри Tooltip.jsx

  // Фиксированная ширина tooltip
  const TOOLTIP_WIDTH = 320

  // обновлённая функция
  const updatePosition = () => {
    if (!anchorEl) return
    const rect = anchorEl.getBoundingClientRect()

    // Если тултип уже отрендерен — берём реальные размеры, иначе используем запасное
    const tooltipEl = tooltipRef.current
    let tooltipRect = { width: TOOLTIP_WIDTH, height: 96 }
    if (tooltipEl) {
      tooltipRect = tooltipEl.getBoundingClientRect()
    }

    // центр элемента
    const centerX = rect.left + rect.width / 2

    const gap = 8
    let top
    let placement

    if (isMobile) {
      // вверх: тултип над элементом
      top = rect.top - tooltipRect.height - gap
      placement = "top"
    } else {
      // вниз: тултип под элементом
      top = rect.bottom + gap
      placement = "bottom"
    }

    // Теперь рассчитываем left как центр тултипа = центр элемента - половина ширины тултипа
    let left = centerX - tooltipRect.width / 2

    // Защита от выхода за границы: left >= padding, left + tooltipWidth <= window.innerWidth - padding
    const padding = 8
    left = Math.max(
      padding,
      Math.min(left, window.innerWidth - padding - tooltipRect.width)
    )

    const minTop = 8
    const finalTop = Math.max(minTop, top)

    setCoords({ left, top: finalTop, placement })
  }

  useEffect(() => {
    if (!show) return

    // посчитать позицию после монтирования тултипа
    updatePosition()

    // Обновлять позицию при любых скроллах/перемещениях и ресайзе
    const handleScroll = () => updatePosition()
    window.addEventListener("scroll", handleScroll, true) // capture=true — ловим прокрутки внутренних контейнеров
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", handleScroll, true)
      window.removeEventListener("resize", updatePosition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, anchorEl, isMobile])

  if (!show) return null

  const tooltipNode = (
    <Motion.AnimatePresence>
      <Motion.motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, y: coords.placement === "top" ? 8 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: coords.placement === "top" ? 8 : -8 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "fixed",
          left: coords.left,
          top: coords.top,
          transform: "translateX(-50%)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div
          className="relative bg-brand-deep-teal text-white rounded-lg shadow-lg p-4 pointer-events-none"
          style={{
            width: `${TOOLTIP_WIDTH}px`,
            minWidth: `${TOOLTIP_WIDTH}px`,
          }}
        >
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-200 mb-3">{body}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-500/40 text-gray-200 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Стрелка — направление зависит от placement */}
          <div
            style={{ left: "50%", transform: "translateX(-50%)" }}
            className={`absolute w-0 h-0 ${
              coords.placement === "top"
                ? "-bottom-1 border-l-6 border-r-6 border-t-6 border-transparent border-t-[#0e403f]"
                : "-top-1 border-l-6 border-r-6 border-b-6 border-transparent border-b-[#0e403f]"
            }`}
          />
        </div>
      </Motion.motion.div>
    </Motion.AnimatePresence>
  )

  return createPortal(tooltipNode, document.body)
}
