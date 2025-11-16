import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import FeaturesGrid from "./FeaturesGrid"
import logoImg from "../../../assets/images/icons/Logo.svg"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// LQIP импорты для всех изображений галереи
import kpp1Img from "../../../assets/images/gallery/kpp-1.jpg?lqip"
import kpp2Img from "../../../assets/images/gallery/kpp-2.jpg?lqip"
import kpp3Img from "../../../assets/images/gallery/kpp-3.jpg?lqip"
import kpp4Img from "../../../assets/images/gallery/kpp-4.jpg?lqip"
import kpp5Img from "../../../assets/images/gallery/kpp-5.jpg?lqip"
import kpp6Img from "../../../assets/images/gallery/kpp-6.jpg?lqip"
import kpp7Img from "../../../assets/images/gallery/kpp-7.jpg?lqip"
import kpp8Img from "../../../assets/images/gallery/kpp-8.jpg?lqip"
import kpp9Img from "../../../assets/images/gallery/kpp-9.jpg?lqip"

/**
 * Gallery - секция с галереей фотографий КПП
 * @returns {JSX.Element} Компонент секции Gallery
 */
export default function Gallery() {
  // Данные для галереи с названиями
  const galleryImages = [
    {
      id: 1,
      src: kpp1Img,
      alt: "КПП вид 1",
      title: "Вид изнутри",
    },
    { id: 2, src: kpp2Img, alt: "КПП вид 2", title: "Пульт  ТУ" },
    {
      id: 3,
      src: kpp3Img,
      alt: "КПП вид 3",
      title: "Зона ожидания",
    },
    {
      id: 4,
      src: kpp4Img,
      alt: "КПП вид 4",
      title: "Зона ожидания",
    },
    { id: 5, src: kpp5Img, alt: "КПП вид 5", title: "Вход" },
    {
      id: 6,
      src: kpp6Img,
      alt: "КПП вид 6",
      title: "Зона выхода",
    },
    {
      id: 7,
      src: kpp7Img,
      alt: "КПП вид 7",
      title: "Выходной турникет",
    },
    { id: 8, src: kpp8Img, alt: "КПП вид 8", title: "Серверная" },
    {
      id: 9,
      src: kpp9Img,
      alt: "КПП вид 9",
      title: "А М СВН и СКУД",
    },
  ]

  // Состояние для выбранного изображения (для десктопа)
  const [selectedImage, setSelectedImage] = useState(galleryImages[0])
  const [loadedImages, setLoadedImages] = useState(new Set())

  // Состояние для текущего слайда
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Хэндлер загрузки изображений
  const onImageLoad = (imageId) => {
    setLoadedImages((prev) => new Set([...prev, imageId]))
  }

  // Обработчик события Swiper
  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex)
  }

  return (
    <section className="min-h-screen bg-brand-deep-teal py-10 ">
      <div className="container mx-auto h-full flex flex-col">
        {/* Заголовок секции */}
        <div className="text-left mb-16 pl-6">
          <h2 className="text-body text-brand-white text-left mb-6">
            <span className="text-brand-amber">Вид изнутри</span>
          </h2>
          <p className="text-brand-white text-left text-body max-w-3xl">
            Так выглядит ВКПП изнутри — через объективы встроенной системы
            видеонаблюдения. Именно так его видит оператор: техника, маршруты
            потоков, рабочие зоны, инженерная инфраструктура.
          </p>
        </div>

        {/* Десктопная галерея - скрыта на мобильных */}
        <div className="hidden lg:flex px-6 flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
          {/* Левая часть - выбранная миниатюра */}
          <div className="flex-1">
            <div className="rounded-2xl shadow-brand">
              {/* Скрытый img для предзагрузки реального изображения */}
              <img
                src={selectedImage.src.src}
                alt=""
                className="hidden"
                onLoad={() => onImageLoad(selectedImage.id)}
              />

              {/* Основное изображение с LQIP */}
              <img
                src={
                  loadedImages.has(selectedImage.id)
                    ? selectedImage.src.src
                    : selectedImage.src.lqip
                }
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg object-cover transition-all duration-300"
                style={{
                  filter: loadedImages.has(selectedImage.id)
                    ? "none"
                    : "blur(12px)",
                  transition: "filter 0.35s ease",
                }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Правая часть - сетка миниатюр 3x3 */}
          <div className="lg:w-auto">
            <div className="grid grid-cols-3 w-fit rounded-2xl overflow-hidden bg-panel">
              {galleryImages.map((image) => {
                const isLoaded = loadedImages.has(image.id)

                return (
                  <div
                    key={image.id}
                    className="relative group w-32 h-32 overflow-hidden"
                  >
                    {/* Скрытый img для предзагрузки реального изображения */}
                    <img
                      src={image.src.src}
                      alt=""
                      className="hidden"
                      onLoad={() => onImageLoad(image.id)}
                    />

                    <button
                      onClick={() => setSelectedImage(image)}
                      className="w-full h-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-divider ring-1 ring-divider"
                    >
                      {selectedImage.id === image.id ? (
                        <div className="w-full h-full bg-panel flex items-center justify-center">
                          <img
                            src={logoImg}
                            alt="Логотип INTEGRAL"
                            className="max-w-full max-h-full w-auto h-auto opacity-60"
                          />
                        </div>
                      ) : (
                        <img
                          src={isLoaded ? image.src.src : image.src.lqip}
                          alt={image.alt}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                          style={{
                            filter: isLoaded
                              ? "grayscale(1)"
                              : "blur(12px) grayscale(1)",
                            transition: "filter 0.35s ease",
                          }}
                          loading="lazy"
                        />
                      )}
                    </button>

                    {/* Выплывающее название при наведении */}
                    <div className="absolute bottom-0 left-0 right-0 bg-brand-deep-teal/95 backdrop-blur-sm text-brand-white text-sm font-medium py-2 px-3  transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      {image.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Мобильная карусель с плавными переходами - видна только на мобильных */}
        <div className="lg:hidden px-6 flex-1 ">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0} // без отступов, как в Instagram
            slidesPerView={1} // одно фото на экране
            centeredSlides={true} // чтобы слайд был по центру
            speed={600} // длительность анимации (мс)
            resistance={true} // "сопротивление" при свайпе
            resistanceRatio={0.85} // сила сопротивления (чем ближе к 1, тем плавнее)
            grabCursor={true} // курсор "руки"
            pagination={{
              el: ".gallery-pagination", // <- сюда Swiper поместит буллеты
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="rounded-2xl overflow-hidden shadow-brand"
            onSlideChange={handleSlideChange}
          >
            {galleryImages.map((image) => {
              const isLoaded = loadedImages.has(image.id)

              return (
                <SwiperSlide key={image.id}>
                  <div className="relative">
                    {/* Скрытый img для предзагрузки реального изображения */}
                    <img
                      src={image.src.src}
                      alt=""
                      className="hidden"
                      onLoad={() => onImageLoad(image.id)}
                    />

                    {/* Основное изображение с LQIP */}
                    <img
                      src={isLoaded ? image.src.src : image.src.lqip}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-all duration-300"
                      style={{
                        filter: isLoaded ? "none" : "blur(12px)",
                        transition: "filter 0.35s ease",
                      }}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* Контейнер пагинации — будет под каруселью */}
          <div className="gallery-pagination mt-4 flex justify-center" />

          {/* Название слайда - отображается всегда */}
          <div className="mt-4 text-center">
            <div className="bg-brand-deep-teal/95 backdrop-blur-sm text-brand-white text-sm font-medium py-2 px-4 rounded-lg inline-block">
              {galleryImages[currentSlideIndex]?.title}
            </div>
          </div>
        </div>
      </div>

      {/* Секция преимуществ - вынесена из контейнера для полной ширины */}
      <FeaturesGrid />
    </section>
  )
}
