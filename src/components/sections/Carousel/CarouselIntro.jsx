export default function CarouselIntro() {
  return (
    <section className="relative w-full pt-2 bg-brand-deep-teal flex flex-col lg:flex-row items-center overflow-hidden">
      {/* Текст - порядок 1 на мобильных, порядок 2 на десктопе */}
      <div className="relative z-10 order-1 lg:order-2 lg:ml-auto lg:mr-10 max-w-2xl text-brand-white px-4 lg:px-0">
        <div className="space-y-4 lg:space-y-6">
          {/* Заголовок */}
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-4xl text-brand-amber text-body">
              ПАК ССОИ ТСОТБ
            </h2>
            <h3 className="text-4xl lg:text-6xl text-brand-amber text-heading">
              ИНТЕГРАЛ
            </h3>
          </div>

          {/* Описание */}
          <div className="space-y-3 lg:space-y-4 text-base lg:text-lg leading-relaxed text-body">
            <p>
              Система сбора и обработки информации от ТСОТБ досмотровой зоны
            </p>

            <p className="font-pt-sans">
              Программно-аппаратный комплекс предназначен для интеграции и
              передачи данных о тревожных и статусных событиях от технических
              средств и систем досмотра различных производителей в зоне
              проведения досмотровых мероприятий (КПП).
            </p>
          </div>
        </div>
      </div>

      {/* Картинка - скрыта на мобильных, порядок 1 на десктопе */}
      <div className="relative left-0 top-0 w-full h-full flex items-center order-2 lg:order-1 hidden lg:flex">
        <img
          src="/DEPO-Storm-1430B1R.png"
          alt="DEPO Storm 1430B1R"
          className="w-auto object-contain"
          style={{ transform: "translateX(-50%)" }}
        />
      </div>
    </section>
  )
}
