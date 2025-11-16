import { useEffect, forwardRef } from "react"
import { gsap } from "gsap"

const ImagePoint = forwardRef(function ImagePoint(
  { imageRef, xPercent = 10, yPercent = 10, ...props },
  ref
) {
  useEffect(() => {
    function updatePosition() {
      const imageEl = imageRef.current
      const pointEl = ref.current

      if (!imageEl || !pointEl) return

      const imageRect = imageEl.getBoundingClientRect()
      const x = imageRect.left + (imageRect.width * xPercent) / 100
      const y = imageRect.top + (imageRect.height * yPercent) / 100

      gsap.set(pointEl, {
        x: x,
        y: y,
        transform: "translate(-50%, -50%)",
        position: "fixed",
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [imageRef, xPercent, yPercent, ref])

  return (
    <div
      ref={ref}
      className="w-3 h-3 bg-amber-400 rounded-full  shadow-lg"
      style={{
        zIndex: 1000,
        position: "fixed",
        left: 0,
        top: 0,
        opacity: 0,
      }}
      {...props}
    />
  )
})

export default ImagePoint
