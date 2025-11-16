---
description: "Примеры компонентов для INTEGRAL LANDING - базовые UI компоненты, секции лендинга, кастомные хуки и анимации"
globs:
  - "src/**/*.{js,jsx,ts,tsx}"
  - "src/components/**/*"
  - "src/hooks/**/*"
alwaysApply: true
---

# Примеры компонентов для INTEGRAL LANDING

## 🧩 Базовые UI компоненты

### Button.jsx

```jsx
// src/components/ui/Button.jsx
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-amber focus:ring-offset-2"

  const variants = {
    primary:
      "bg-brand-amber text-brand-deep-teal hover:bg-brand-amber/90 shadow-amber",
    secondary:
      "bg-panel text-brand-white hover:bg-panel/90 border border-divider",
    outline:
      "border-2 border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-brand-deep-teal",
    ghost: "text-brand-white hover:bg-brand-white/10",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Container.jsx

```jsx
// src/components/ui/Container.jsx
export default function Container({
  children,
  className = "",
  maxWidth = "7xl",
}) {
  const maxWidths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "7xl": "max-w-7xl",
  }

  return (
    <div className={`mx-auto px-6 ${maxWidths[maxWidth]} ${className}`}>
      {children}
    </div>
  )
}
```

### Section.jsx

```jsx
// src/components/ui/Section.jsx
export default function Section({
  children,
  className = "",
  background = "default",
  padding = "default",
}) {
  const backgrounds = {
    default: "bg-brand-deep-teal",
    panel: "bg-panel",
    grey: "bg-grey-2",
  }

  const paddings = {
    sm: "py-12",
    default: "py-20",
    lg: "py-32",
  }

  return (
    <section
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
    >
      {children}
    </section>
  )
}
```

## 🎯 Секции лендинга

### Hero.jsx

```jsx
// src/components/sections/Hero/Hero.jsx
import Container from "../../ui/Container"
import Button from "../../ui/Button"

export default function Hero() {
  return (
    <section className="min-h-screen bg-brand-deep-teal flex items-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Текстовый контент */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-brand-white leading-tight">
              Контрольно-пропускной пункт
              <span className="text-brand-amber block">нового поколения</span>
            </h1>
            <p className="text-xl text-grey-1 leading-relaxed">
              Инновационное решение для обеспечения безопасности и контроля
              доступа с использованием передовых технологий
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Узнать больше</Button>
              <Button variant="outline" size="lg">
                Демо версия
              </Button>
            </div>
          </div>

          {/* Изображение */}
          <div className="relative">
            <div className="bg-panel rounded-2xl p-8 shadow-brand">
              <img
                src="/images/kpp-hero.jpg"
                alt="Контрольно-пропускной пункт"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

### SplitView.jsx

```jsx
// src/components/sections/SplitView/SplitView.jsx
import Container from "../../ui/Container"

export default function SplitView() {
  return (
    <section className="min-h-screen bg-panel flex items-center">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-white mb-6">
            Внутреннее устройство
          </h2>
          <p className="text-xl text-grey-1 max-w-3xl mx-auto">
            Изучите конструкцию КПП в разрезе и поймите, как работает каждая
            система безопасности
          </p>
        </div>

        <div className="relative">
          <div className="bg-brand-deep-teal rounded-2xl p-8 shadow-brand">
            <img
              src="/images/kpp-split.jpg"
              alt="Разрез КПП"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Интерактивные элементы */}
          <div className="absolute top-1/4 left-1/4 bg-brand-amber text-brand-deep-teal px-4 py-2 rounded-lg font-semibold">
            Система сканирования
          </div>
          <div className="absolute top-1/2 right-1/4 bg-brand-amber text-brand-deep-teal px-4 py-2 rounded-lg font-semibold">
            Контроль доступа
          </div>
        </div>
      </Container>
    </section>
  )
}
```

## 🔧 Кастомные хуки

### useIntersectionObserver.js

```jsx
// src/hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from "react"

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options, hasIntersected])

  return { ref, isIntersecting, hasIntersected }
}
```

### useCarousel.js

```jsx
// src/hooks/useCarousel.js
import { useState, useCallback } from "react"

export function useCarousel(items, autoPlay = false, interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const goTo = useCallback(
    (index) => {
      setCurrentIndex(index % items.length)
    },
    [items.length]
  )

  return {
    currentIndex,
    currentItem: items[currentIndex],
    next,
    prev,
    goTo,
    isFirst: currentIndex === 0,
    isLast: currentIndex === items.length - 1,
  }
}
```

## 🎨 Анимации и переходы

### FadeIn.jsx

```jsx
// src/components/ui/FadeIn.jsx
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const { ref, isIntersecting } = useIntersectionObserver()

  const directions = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${directions[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

## 📱 Адаптивные компоненты

### ResponsiveGrid.jsx

```jsx
// src/components/ui/ResponsiveGrid.jsx
export default function ResponsiveGrid({
  children,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "6",
  className = "",
}) {
  const gridCols = Object.entries(cols)
    .map(([breakpoint, cols]) => `${breakpoint}:grid-cols-${cols}`)
    .join(" ")

  return (
    <div className={`grid grid-cols-1 gap-${gap} ${gridCols} ${className}`}>
      {children}
    </div>
  )
}
```

## 🎯 Использование в App.jsx

```jsx
// src/App.jsx
import Header from "./components/layout/AppHeader"
import Hero from "./components/sections/Hero/Hero"
import SplitView from "./components/sections/SplitView/SplitView"
// ... другие импорты

function App() {
  return (
    <div className="min-h-screen bg-brand-deep-teal">
      <Header />

      <main>
        <Hero />
        <SplitView />
        {/* Другие секции */}
      </main>
    </div>
  )
}
```

---

**Важно:** Все компоненты должны следовать принципам из `PROJECT_RULES.md` и использовать только цвета из вашей палитры!
