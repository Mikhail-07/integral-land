import { useEffect, useState } from "react"
import lqip from "../../../assets/images/front-left-quarter-view.webp?lqip"

/**
 * Hero - главная секция с заголовком и изображением модульного пункта досмотра
 */
export default function Hero({ onLoaded }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded && typeof onLoaded === "function") onLoaded()
  }, [loaded, onLoaded])

  const handleScrollToOrder = () => {
    const orderSection = document.getElementById("order")
    if (orderSection) {
      orderSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className="w-full flex flex-col min-h-screen bg-brand-deep-teal relative px-4 py-10 md:px-6">
      {/* Заголовок сверху - всегда видим */}
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-2 flex-shrink-0">
        <h1 className="text-brand-white text-center font-pt-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[110%]">
          МОДУЛЬНЫЙ ПУНКТ ДОСМОТРА
        </h1>
      </div>

      {/* Пространство для изображения между заголовком и текстом */}
      <div className="relative flex-grow flex items-center justify-center min-h-0">
        {/* Изображение - абсолютное позиционирование на всю ширину, по центру между заголовком и текстом */}
        <div className="absolute left-[calc(50%-50vw)] top-1/2 -translate-y-1/2 w-screen overflow-hidden z-0">
          <img
            src={loaded ? lqip.src : lqip.lqip}
            alt="Модульный пункт досмотра - вид спереди слева"
            className={`w-full h-auto object-contain transition-all duration-300 ${
              loaded ? "blur-0" : "blur-md"
            }`}
            decoding="async"
            fetchPriority="high"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {/* Карточка с текстом снизу - всегда видима */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pb-18 md:pb-4 flex-shrink-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          <div className="flex-1">
            <p className="text-brand-white font-pt-serif text-lg sm:text-xl md:text-xl lg:text-xl leading-[120%]">
              <span className="text-brand-amber">Интеграл-ВКПП</span> —
              Предназначен для целей организации контрольно-пропускного пункта,
              включающего организацию досмотровых мероприятий, в том числе
              проведение основного, дополнительного и повторного досмотра лиц
              при перемещении в зону транспортной безопасности на объекте
              транспортной инфраструктуры.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleScrollToOrder}
              className="bg-brand-amber hover:bg-brand-amber/90 text-brand-deep-teal font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg cursor-pointer"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
