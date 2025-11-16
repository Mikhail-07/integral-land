import { useEffect, useRef, forwardRef } from "react"
import { gsap } from "gsap"

const ConnectorLine = forwardRef(function ConnectorLine(
  { fromRef, toRef, color = "bg-amber-400", thickness = "h-0.5" },
  ref
) {
  const lineRef = useRef(null)

  useEffect(() => {
    function updateLine() {
      const fromEl = fromRef.current
      const toEl = toRef.current
      const lineEl = (ref || lineRef).current
      if (!fromEl || !toEl || !lineEl) return

      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()

      // Правый нижний угол текста с небольшим нахлестом
      const x1 = fromRect.right // небольшой нахлест вправо
      const y1 = fromRect.bottom - 2 // небольшой нахлест вниз

      // Центр точки (используем getBoundingClientRect для точки с position: fixed)
      const x2 = toRect.left + toRect.width / 2
      const y2 = toRect.top + toRect.height / 2

      const dx = x2 - x1
      const dy = y2 - y1
      const length = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      // console.log("ConnectorLine:", {
      //   from: {
      //     x: x1,
      //     y: y1,
      //     corner: "right-bottom",
      //     overlap: "5px right, 2px down",
      //   },
      //   to: { x: x2, y: y2 },
      //   length: length,
      //   angle: angle,
      //   fromRect: fromRect,
      //   toRect: toRect,
      // })

      gsap.set(lineEl, {
        width: length,
        rotation: angle,
        x: x1,
        y: y1,
        opacity: 1,
        transformOrigin: "0 0",
        position: "fixed",
      })
    }

    // Небольшая задержка, чтобы ImagePoint успел позиционироваться
    const timeoutId = setTimeout(updateLine, 100)

    updateLine()
    window.addEventListener("resize", updateLine)
    window.addEventListener("scroll", updateLine)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", updateLine)
      window.removeEventListener("scroll", updateLine)
    }
  }, [fromRef, toRef, ref])

  return (
    <div
      ref={ref || lineRef}
      className={`${thickness} ${color}`}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        opacity: 0,
        transformOrigin: "left center",
      }}
    />
  )
})

export default ConnectorLine
