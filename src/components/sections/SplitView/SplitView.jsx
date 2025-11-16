import { useState } from "react"
import lqip from "../../../assets/images/split-view.webp?lqip"

/**
 * SplitView - секция с разрезом КПП на всю высоту экрана
 */
export default function SplitView() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen bg-brand-deep-teal relative px-4 py-10 md:px-6">
      {/* Изображение */}
      <div className="w-screen overflow-hidden lg:overflow-visible">
        <img
          src={loaded ? lqip.src : lqip.lqip}
          alt="Разрез модульного пункта досмотра"
          className={`w-[200%] h-auto object-contain transition-all duration-300 lg:w-full lg:translate-x-0 lg:scale-100 scale-[2] translate-x-[calc(100vw-50%)] ${
            loaded ? "blur-0" : "blur-md"
          }`}
          decoding="async"
          fetchPriority="high"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Карточка с текстом */}
      <div className="w-full max-w-[704px] mx-auto sm:-mt-12 md:-mt-10 lg:-mt-20 xl:-mt-24 2xl:-mt-32">
        <div>
          <p className="text-brand-white  text-body">
            <span className="text-brand-amber">Интеграл-ВКПП</span> — готовое
            интегрированное решение, включающее все обязательные системы и
            технические средства обеспечения транспортной безопасности.
          </p>
        </div>
      </div>
    </section>
  )
}
