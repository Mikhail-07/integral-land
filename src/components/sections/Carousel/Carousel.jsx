import React, { useEffect, useRef, useState } from "react"
import CarouselIntro from "./CarouselIntro"
import Tooltip from "./Tooltip"

// LQIP импорты для всех изображений карусели
import smdImg from "../../../assets/carousel/tsotbCard-SMD.png?lqip"
import smdHoveredImg from "../../../assets/carousel/hovered/tsotbCard-SMD (hovered).png?lqip"
import xrayImg from "../../../assets/carousel/tsotbCard-xRay.png?lqip"
import xrayHoveredImg from "../../../assets/carousel/hovered/tsotbCard-xRay (hovered).png?lqip"
import aspectImg from "../../../assets/carousel/tsotbCard-Aspect.png?lqip"
import aspectHoveredImg from "../../../assets/carousel/hovered/tsotbCard-Aspect (hovered).png?lqip"
import aspectRmImg from "../../../assets/carousel/tsotbCard-AspectRM.png?lqip"
import aspectRmHoveredImg from "../../../assets/carousel/hovered/tsotbCard-AspectRM (hovered).png?lqip"
import segmentPremiumImg from "../../../assets/carousel/tsotbCard-SegmentPremium.png?lqip"
import segmentPremiumHoveredImg from "../../../assets/carousel/hovered/tsotbCard-SegmentPremium (hovered).png?lqip"
import mionImg from "../../../assets/carousel/tsotbCard-Mion.png?lqip"
import mionHoveredImg from "../../../assets/carousel/hovered/tsotbCard-Mion (hovered).png?lqip"
import chimexpertImg from "../../../assets/carousel/tsotbCard-Chimexpert.png?lqip"
import chimexpertHoveredImg from "../../../assets/carousel/hovered/tsotbCard-Chimexpert (hovered).png?lqip"
import segmentBioImg from "../../../assets/carousel/tsotbCard-SegmentBio.png?lqip"
import segmentBioHoveredImg from "../../../assets/carousel/hovered/tsotbCard-SegmentBio (hovered).png?lqip"

const carouselImages = [
  {
    src: smdImg,
    hoveredSrc: smdHoveredImg,
    alt: "SMD",
    tooltip: {
      title: "Металоискатель",
      body: "Обнаружение металлических предметов, формирование событий:",
      tags: ["Время", "ID прибора", "Статус"],
    },
  },
  {
    src: xrayImg,
    hoveredSrc: xrayHoveredImg,
    alt: "xRay",
    tooltip: {
      title: "Интроскопия",
      body: "Обнаружение металлических предметов и органических веществ.",
      tags: ["Время", "ID прибора", "Оператор", "Результат"],
    },
  },
  {
    src: aspectImg,
    hoveredSrc: aspectHoveredImg,
    alt: "Aspect",
    tooltip: {
      title: "БСОД-01 АКРК",
      body: "Одновременное получение данных со всех радиационных мониторов на объекте",
      tags: [
        "Время",
        "ID радиационного монитора",
        "Оператор",
        "Степень опасности",
        "Результат",
        "Комментарий",
      ],
    },
  },
  {
    src: aspectRmImg,
    hoveredSrc: aspectRmHoveredImg,
    alt: "AspectRM",
    tooltip: {
      title: "Радиационный монитор",
      body: "Обнаружение повышенного радиационного фона",
      tags: [
        "Время",
        "ID прибора",
        "Оператор",
        "Степень опасности",
        "Результат",
      ],
    },
  },
  {
    src: segmentPremiumImg,
    hoveredSrc: segmentPremiumHoveredImg,
    alt: "SegmentPremium",
    tooltip: {
      title: "Детектор запрещенных веществ",
      body: "Обнаружение следов взрывчатых и наркотических веществ",
      tags: [
        "Время",
        "ID прибора",
        "Место установки",
        "Тип вещества",
        "Локализация",
        "Комментарий",
      ],
    },
  },
  {
    src: mionImg,
    hoveredSrc: mionHoveredImg,
    alt: "Mion",
    tooltip: {
      title: "Детектор химических и биологических агентов",
      body: "Преимущества подключения",
      tags: [
        "Время",
        "ID прибора",
        "Место установки",
        "Тип вещества",
        "Комментарий",
      ],
    },
  },
  {
    src: chimexpertImg,
    hoveredSrc: chimexpertHoveredImg,
    alt: "Chimexpert",
    tooltip: {
      title: "Детектор паров и следов ВВ (Кербер)",
      body: "Обнаружение взрывчатых веществ",
      tags: [
        "Время",
        "ID прибора",
        "Место установки",
        "Тип ВВ",
        "Локализация ВВ",
        "Комментарий",
      ],
    },
  },
  {
    src: segmentBioImg,
    hoveredSrc: segmentBioHoveredImg,
    alt: "SegmentBio",
    tooltip: {
      title: "Ионно-дрейфовый детектор",
      body: "Обнаружение взрывчатых веществ",
      tags: [
        "Время",
        "ID прибора",
        "Место установки",
        "Тип ВВ",
        "Локализация ВВ",
        "Комментарий",
      ],
    },
  },
]

export default function Carousel() {
  const wrapperRef = useRef(null) // Обертка для CarouselIntro + карусель
  const carouselRef = useRef(null) // Сама карусель
  const trackRef = useRef(null)
  const autoScrollDirectionRef = useRef(null) // 'end' | 'start' | null
  const autoScrollTimeoutRef = useRef(null)

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set()) // Отслеживание загруженных изображений
  const [isDragging, setIsDragging] = useState(false) // Состояние перетаскивания

  // Фиксированные размеры для карусели
  const SLIDE_WIDTH = 300 // Фиксированная ширина слайда
  const GAP_PX = 32

  // Refs для drag and drop
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const isDraggingRef = useRef(false) // Ref для доступа к состоянию перетаскивания в обработчиках

  // Refs для touch-событий
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartScrollLeft = useRef(0)
  const isScrollingRef = useRef(false) // Отслеживание скролла/свайпа
  const touchTooltipTimeoutRef = useRef(null) // Таймер для задержки показа тултипа на touch
  const SWIPE_THRESHOLD = 10 // Порог в пикселях для определения свайпа

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const setDimensions = () => {
      const count = carouselImages.length
      const totalWidth = SLIDE_WIDTH * count + GAP_PX * (count - 1)
      track.style.width = `${totalWidth}px`
      for (const child of Array.from(track.children)) {
        if (child.tagName === "BUTTON") {
          child.style.width = `${SLIDE_WIDTH}px`
        }
      }
    }

    setDimensions()
    window.addEventListener("resize", setDimensions)
    return () => {
      window.removeEventListener("resize", setDimensions)
    }
  }, [])

  // Очистка возможной отложенной автопрокрутки при размонтировании
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
        autoScrollTimeoutRef.current = null
      }
    }
  }, [])

  // Очистка таймера тултипа при размонтировании
  useEffect(() => {
    return () => {
      if (touchTooltipTimeoutRef.current) {
        clearTimeout(touchTooltipTimeoutRef.current)
        touchTooltipTimeoutRef.current = null
      }
    }
  }, [])

  const getVisibleRatio = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return 0
    const rect = wrapper.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const visibleTop = Math.max(rect.top, 0)
    const visibleBottom = Math.min(rect.bottom, viewportHeight)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    if (rect.height <= 0) return 0
    return Math.max(0, Math.min(1, visibleHeight / rect.height))
  }

  const scheduleAutoScroll = (direction) => {
    const container = carouselRef.current
    if (!container) return
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
      autoScrollTimeoutRef.current = null
    }
    autoScrollTimeoutRef.current = setTimeout(() => {
      const maxLeft = container.scrollWidth - container.clientWidth
      const targetLeft = direction === "end" ? Math.max(0, maxLeft) : 0
      if (maxLeft > 0 || direction === "start") {
        autoScrollDirectionRef.current = direction
        container.scrollTo({ left: targetLeft, behavior: "smooth" })
      }
      autoScrollTimeoutRef.current = null
    }, 180)
  }

  // Глобальный перехват колесика мыши: когда блок карусели виден и пользователь скроллит вниз,
  // останавливаем вертикальный скролл страницы и плавно прокручиваем карусель до конца.
  useEffect(() => {
    const container = carouselRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    const onWindowWheel = (e) => {
      // Игнорируем wheel события во время перетаскивания
      if (isDraggingRef.current) return

      const visibleRatio = getVisibleRatio()
      if (visibleRatio <= 0) return

      const isVerticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX)
      if (!isVerticalIntent) return

      if (visibleRatio < 0.5) return

      const isScrollingDown = e.deltaY > 0
      if (isScrollingDown) {
        if (autoScrollDirectionRef.current === "end") return
        e.preventDefault()
        e.stopPropagation()
        scheduleAutoScroll("end")
      } else if (e.deltaY < 0) {
        if (autoScrollDirectionRef.current === "start") return
        e.preventDefault()
        e.stopPropagation()
        scheduleAutoScroll("start")
      }
    }

    window.addEventListener("wheel", onWindowWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", onWindowWheel)
    }
  }, [])

  const handleWheel = (e) => {
    // Игнорируем wheel события во время перетаскивания
    if (isDragging) return

    const container = carouselRef.current
    if (!container) return

    const isVerticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX)
    if (!isVerticalIntent) return

    const visibleRatio = getVisibleRatio()
    if (visibleRatio < 0.5) return

    const isScrollingDown = e.deltaY > 0
    if (isScrollingDown) {
      if (autoScrollDirectionRef.current === "end") return
      e.preventDefault()
      e.stopPropagation()
      scheduleAutoScroll("end")
    } else if (e.deltaY < 0) {
      if (autoScrollDirectionRef.current === "start") return
      e.preventDefault()
      e.stopPropagation()
      scheduleAutoScroll("start")
    }
  }

  // Хэндлер загрузки изображений
  const onImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, index]))
  }

  // Обработчики drag and drop
  const handleMouseDown = (e) => {
    const container = carouselRef.current
    if (!container) return

    // Игнорируем правую кнопку мыши
    if (e.button !== 0) return

    // Отменяем автопрокрутку при начале перетаскивания
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
      autoScrollTimeoutRef.current = null
    }
    autoScrollDirectionRef.current = null

    setIsDragging(true)
    isDraggingRef.current = true
    const rect = container.getBoundingClientRect()
    dragStartX.current = e.pageX - rect.left
    dragStartScrollLeft.current = container.scrollLeft

    // Отключаем hover во время перетаскивания
    setHoveredIndex(null)

    // Предотвращаем выделение текста во время перетаскивания
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const container = carouselRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.pageX - rect.left
    const walk = (x - dragStartX.current) * 1.5 // Множитель для более плавного перетаскивания
    container.scrollLeft = dragStartScrollLeft.current - walk

    // Предотвращаем выделение текста
    e.preventDefault()
  }

  const handleMouseUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    isDraggingRef.current = false

    // Определяем, над каким элементом находится мышь после завершения перетаскивания
    if (e) {
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Проверяем каждый элемент карусели
      for (let i = 0; i < buttonRefs.current.length; i++) {
        const button = buttonRefs.current[i]
        if (!button) continue

        const rect = button.getBoundingClientRect()
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          setHoveredIndex(i)
          break
        }
      }
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      isDraggingRef.current = false
    }
  }

  // Обработчики touch-событий для свайпа
  const handleTouchStart = (e) => {
    const container = carouselRef.current
    if (!container) return

    // Отменяем автопрокрутку при начале перетаскивания
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
      autoScrollTimeoutRef.current = null
    }
    autoScrollDirectionRef.current = null

    // Очищаем таймер тултипа если он был
    if (touchTooltipTimeoutRef.current) {
      clearTimeout(touchTooltipTimeoutRef.current)
      touchTooltipTimeoutRef.current = null
    }

    const touch = e.touches[0]
    touchStartX.current = touch.pageX
    touchStartY.current = touch.pageY
    touchStartScrollLeft.current = container.scrollLeft

    setIsDragging(true)
    isDraggingRef.current = true
    isScrollingRef.current = false

    // Отключаем hover во время перетаскивания
    setHoveredIndex(null)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return

    const container = carouselRef.current
    if (!container) return

    const touch = e.touches[0]
    const deltaX = touch.pageX - touchStartX.current
    const deltaY = touch.pageY - touchStartY.current

    // Определяем, был ли свайп (горизонтальный или вертикальный)
    if (
      Math.abs(deltaX) > SWIPE_THRESHOLD ||
      Math.abs(deltaY) > SWIPE_THRESHOLD
    ) {
      isScrollingRef.current = true
    }

    // Прокручиваем карусель
    const walk = (touch.pageX - touchStartX.current) * 1.5
    container.scrollLeft = touchStartScrollLeft.current - walk
  }

  const handleTouchEnd = (e) => {
    if (!isDragging) return

    const container = carouselRef.current
    if (!container) return

    const touch = e.changedTouches[0]
    const deltaX = touch.pageX - touchStartX.current
    const deltaY = touch.pageY - touchStartY.current
    const totalDelta = Math.hypot(deltaX, deltaY)

    setIsDragging(false)
    isDraggingRef.current = false

    // Если был свайп, не показываем тултип
    if (isScrollingRef.current || totalDelta > SWIPE_THRESHOLD) {
      setHoveredIndex(null)
      isScrollingRef.current = false
      return
    }

    // Если не было свайпа, определяем элемент под пальцем и показываем тултип с задержкой
    const touchX = touch.clientX
    const touchY = touch.clientY

    for (let i = 0; i < buttonRefs.current.length; i++) {
      const button = buttonRefs.current[i]
      if (!button) continue

      const rect = button.getBoundingClientRect()
      if (
        touchX >= rect.left &&
        touchX <= rect.right &&
        touchY >= rect.top &&
        touchY <= rect.bottom
      ) {
        // Показываем тултип с небольшой задержкой для лучшего UX
        touchTooltipTimeoutRef.current = setTimeout(() => {
          setHoveredIndex(i)
          touchTooltipTimeoutRef.current = null
        }, 300) // 300ms задержка
        break
      }
    }

    isScrollingRef.current = false
  }

  // Глобальный обработчик mousemove для перетаскивания за пределами контейнера
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e) => {
      const container = carouselRef.current
      if (!container) return

      const x = e.pageX - container.getBoundingClientRect().left
      const walk = (x - dragStartX.current) * 1.5
      container.scrollLeft = dragStartScrollLeft.current - walk
      e.preventDefault()
    }

    const handleGlobalMouseUp = (e) => {
      setIsDragging(false)
      isDraggingRef.current = false

      // Определяем, над каким элементом находится мышь после завершения перетаскивания
      if (e) {
        const mouseX = e.clientX
        const mouseY = e.clientY

        // Проверяем каждый элемент карусели
        for (let i = 0; i < buttonRefs.current.length; i++) {
          const button = buttonRefs.current[i]
          if (!button) continue

          const rect = button.getBoundingClientRect()
          if (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
          ) {
            setHoveredIndex(i)
            break
          }
        }
      }
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    window.addEventListener("mouseup", handleGlobalMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove)
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging])

  const buttonRefs = useRef([]) // array of DOM refs

  return (
    <div
      id="carousel"
      ref={wrapperRef}
      className=" justify-center flex flex-col h-screen"
    >
      {/* Вводный блок перед каруселью */}
      <CarouselIntro />

      {/* Карусель */}
      <section
        ref={carouselRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Карусель устройств"
        className={`relative w-full z-10 bg-brand-deep-teal mt-8 overflow-x-auto hide-scrollbar ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          // height: `${CONTAINER_HEIGHT}px`,
          boxShadow: "inset 0 1px 0 0 #e1b425", // внутренний бордер сверху
          userSelect: isDragging ? "none" : "auto",
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full items-start relative"
          style={{ gap: `${GAP_PX}px` }}
        >
          {carouselImages.map((image, index) => {
            const isLoaded = loadedImages.has(index)
            const isHovered = hoveredIndex === index

            return (
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                key={image.src.src}
                className="flex-shrink-0 flex items-start justify-start relative group border-none bg-transparent p-0 cursor-pointer touch-manipulation"
                // фиксированная ширина слайда
                style={{ width: `${SLIDE_WIDTH}px` }}
                onMouseEnter={() => {
                  if (!isDragging) {
                    setHoveredIndex(index)
                  }
                }}
                onMouseLeave={() => {
                  if (!isDragging) {
                    setHoveredIndex(null)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setHoveredIndex(hoveredIndex === index ? null : index)
                  }
                }}
              >
                {/* Скрытые img для предзагрузки реальных изображений */}
                <img
                  src={image.src.src}
                  alt=""
                  className="hidden"
                  onLoad={() => onImageLoad(index)}
                />
                <img
                  src={image.hoveredSrc.src}
                  alt=""
                  className="hidden"
                  onLoad={() => onImageLoad(index)}
                />

                {/* Tooltip для этого элемента */}
                <Tooltip
                  show={isHovered}
                  title={image.tooltip.title}
                  body={image.tooltip.body}
                  tags={image.tooltip.tags}
                  anchorEl={buttonRefs.current[index]} // <-- передаём DOM-элемент
                />

                {/* Основное изображение с LQIP */}
                <img
                  src={isLoaded ? image.src.src : image.src.lqip}
                  alt={image.alt}
                  className="block w-full h-auto object-contain transition-all duration-300"
                  style={{
                    filter: isLoaded ? "none" : "blur(12px)",
                    transition: "filter 0.35s ease",
                    maxHeight: "400px",
                  }}
                  loading="lazy"
                />

                {/* Hover overlay изображение с LQIP */}
                <img
                  src={isLoaded ? image.hoveredSrc.src : image.hoveredSrc.lqip}
                  alt={`${image.alt} hovered`}
                  className={`absolute inset-0 block w-full h-auto object-contain transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    filter: isLoaded ? "none" : "blur(12px)",
                    transition: "filter 0.35s ease, opacity 0.3s ease",
                    maxHeight: "400px",
                  }}
                  loading="lazy"
                />

                {/* Перекрывающая полоска слева у первого слайда */}
                {index === 0 && (
                  <div
                    aria-hidden
                    className="absolute -top-[1px] left-0 h-[4px] bg-brand-deep-teal z-20"
                    style={{
                      width: `${SLIDE_WIDTH / 2 + 2}px`,
                      transform: `translateX(-3px)`,
                    }}
                  />
                )}

                {/* Перекрывающая полоска справа у последнего слайда */}
                {index === carouselImages.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -top-[2px] right-0 h-[5px] bg-brand-deep-teal z-20"
                    style={{
                      width: `${SLIDE_WIDTH / 2}px`,
                      transform: `translateX(1px)`,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
