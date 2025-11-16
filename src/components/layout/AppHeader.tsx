import React, { useState, useEffect } from "react"
import logoImg from "../../assets/images/icons/Logo.svg"

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const SCROLL_THRESHOLD = 20 // Минимальное расстояние скролла для показа хедера

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = lastScrollY - currentScrollY

      // Показываем меню при наведении курсора
      if (isHovered) {
        setIsVisible(true)
        return
      }

      // Показываем меню при явном скролле вверх (больше порога) или в самом верху страницы
      if (scrollDifference > SCROLL_THRESHOLD || currentScrollY < 10) {
        setIsVisible(true)
      }
      // Скрываем меню при скролле вниз
      else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isHovered])

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full bg-brand-deep-teal text-white z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Логотип */}
        <div className="flex items-center space-x-2">
          <img src={logoImg} alt="Integral Project" className="h-12" />
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-yellow-400">INTEGRAL</span>
            <span className="text-xs font-bold">PROJECT</span>
          </div>
        </div>

        {/* Навигация и кнопка */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-4 font-pt-sans">
            <a
              href="#topview"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection("topview")
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Преимущества
            </a>
            <a
              href="#carousel"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection("carousel")
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Решения
            </a>
            <a
              href="#environment"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection("environment")
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Применения
            </a>
            <a
              href="#specifications"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection("specifications")
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Характеристики
            </a>
          </nav>
          <button
            onClick={() => handleScrollToSection("order")}
            className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition cursor-pointer"
          >
            Заказать
          </button>
        </div>
      </div>
    </header>
  )
}
