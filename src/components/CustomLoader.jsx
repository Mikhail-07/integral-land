import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import logoImg from "../assets/images/icons/Logo.svg"

export default function CustomLoader({ onLoaded }) {
  const [isFlyingAway, setIsFlyingAway] = useState(false)

  useEffect(() => {
    // Симуляция загрузки
    const timer = setTimeout(() => {
      setIsFlyingAway(true)
      // После анимации улетания вызываем onLoaded
      setTimeout(() => {
        onLoaded()
      }, 1000) // Длительность анимации улетания
    }, 2000) // Время показа лоадера

    return () => clearTimeout(timer)
  }, [onLoaded])

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-brand-deep-teal transition-all duration-1000 ease-in-out ${
        isFlyingAway
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Логотип */}
        <img src={logoImg} alt="Integral Project" className="h-16 w-auto" />

        {/* Текст с анимацией светлой тени */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-400">INTEGRAL</span>
            <span className="text-sm font-bold text-white">PROJECT</span>
          </div>
          {/* Светлая тень, которая пробегает по тексту */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

CustomLoader.propTypes = {
  onLoaded: PropTypes.func.isRequired,
}
