import React, { useEffect, useState, forwardRef } from "react"
import PropTypes from "prop-types"

const ImageArrow = forwardRef(function ImageArrow(
  {
    imageRef,
    xPercent = 50,
    yPercent = 50,
    src = "/arrow.svg",
    minSize = 20,
    vw = 4,
    maxSize = 48,
    style,
    ...props
  },
  ref
) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [imageHeight, setImageHeight] = useState(0)

  const updateArrowPosition = () => {
    const image = imageRef?.current
    if (!image) return

    const imageRect = image.getBoundingClientRect()

    // Extract scale from computed transform matrix (GSAP applies scale via CSS transform)
    const transform = getComputedStyle(image).transform
    let scaleX = 1
    let scaleY = 1
    if (transform && transform !== "none") {
      const matrix = new DOMMatrixReadOnly(transform)
      scaleX = matrix.a || 1
      scaleY = matrix.d || 1
    }

    // Work in the unscaled local space relative to transform-origin: 50% 50%
    const baseWidth = imageRect.width / (scaleX || 1)
    const baseHeight = imageRect.height / (scaleY || 1)

    const centerX = imageRect.left + imageRect.width / 2
    const centerY = imageRect.top + imageRect.height / 2

    const offsetXLocal = (baseWidth * (xPercent - 50)) / 100
    const offsetYLocal = (baseHeight * (yPercent - 50)) / 100

    const x = centerX + offsetXLocal * scaleX
    const y = centerY + offsetYLocal * scaleY

    // Set arrow height equal to half of image height
    setImageHeight(imageRect.height / 2)
    setPosition({ top: y, left: x })
  }

  useEffect(() => {
    updateArrowPosition()
    window.addEventListener("resize", updateArrowPosition)
    window.addEventListener("scroll", updateArrowPosition)
    return () => {
      window.removeEventListener("resize", updateArrowPosition)
      window.removeEventListener("scroll", updateArrowPosition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRef, xPercent, yPercent])

  const mergedStyle = {
    position: "fixed",
    top: `${position.top}px`,
    left: `${position.left}px`,
    height: imageHeight > 0 ? `${imageHeight}px` : "auto",
    width: "auto",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    ...(style || undefined),
  }

  return (
    <img
      ref={ref}
      src={src}
      alt="Arrow"
      style={mergedStyle}
      aria-hidden="true"
      {...props}
    />
  )
})

ImageArrow.propTypes = {
  imageRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  xPercent: PropTypes.number,
  yPercent: PropTypes.number,
  src: PropTypes.string,
  minSize: PropTypes.number,
  vw: PropTypes.number,
  maxSize: PropTypes.number,
  style: PropTypes.object,
}

export default ImageArrow
