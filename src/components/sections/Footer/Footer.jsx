import React from "react"
import chipTuneLogo from "../../../assets/images/icons/chip-tune-logo-blue 1.svg"
import youtubeIcon from "../../../assets/images/icons/youtube.svg"
import tgIcon from "../../../assets/images/icons/tg.svg"
import whatsappIcon from "../../../assets/images/icons/whatsapp.svg"
import logoImg from "../../../assets/images/icons/Logo.svg"

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-deep-teal)] text-[var(--color-brand-white)]">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Производитель */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Производитель</h3>

            <img
              src={chipTuneLogo}
              alt="ЧИПТОН"
              className="w-36 h-12 mb-4"
              aria-hidden={false}
            />

            <div className="text-sm leading-relaxed text-[var(--color-grey-2)]">
              <p className="font-medium">ООО «Чиптон»</p>
              <p>Россия, Москва</p>
              <p>ул. Бауманская, д. 58, стр. 16, пом. 13</p>
              <a
                href="mailto:info@chip-tune.ru"
                className="block mt-2 text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              >
                info@chip-tune.ru
              </a>

              <div className="flex gap-3 mt-4" aria-hidden>
                <a
                  href="#"
                  className="p-1 hover:opacity-90"
                  aria-label="YouTube"
                >
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
                <a
                  href="#"
                  className="p-1 hover:opacity-90"
                  aria-label="Telegram"
                >
                  <img src={tgIcon} alt="Telegram" />
                </a>
                <a
                  href="#"
                  className="p-1 hover:opacity-90"
                  aria-label="WhatsApp"
                >
                  <img src={whatsappIcon} alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>

          {/* Дистрибьютор */}
          <div>
            <h3 className="text-sm mb-4  font-semibold">Дистрибьютор</h3>

            <div className="flex items-center space-x-2 mb-4 h-12">
              <img src={logoImg} alt="Integral Project" className="h-12" />
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-yellow-400">
                  INTEGRAL
                </span>
                <span className="text-xs font-bold">PROJECT</span>
              </div>
            </div>

            <div className="text-sm leading-relaxed text-[var(--color-grey-2)]">
              <p className="font-medium">ООО «Торговый дом "Интеграл"»</p>
              <p>Россия, г. Москва</p>
              <p>ул. Бауманская, д. 58, стр. 16, пом. 20</p>
              <a
                href="tel:+79262488651"
                className="block mt-2 text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              >
                +7 926 248-86-51
              </a>

              <div className="flex gap-3 mt-4" aria-hidden>
                <a
                  href="#"
                  className="p-1 hover:opacity-90"
                  aria-label="YouTube"
                >
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
                <a
                  href="#"
                  className="p-1 hover:opacity-90"
                  aria-label="Telegram"
                >
                  <img src={tgIcon} alt="Telegram" />
                </a>
                <a
                  href="#"
                  className="p-1 hover:opacity-90"
                  aria-label="WhatsApp"
                >
                  <img src={whatsappIcon} alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>

          {/* Центр информация */}
          <div>
            <h3 className="text-sm font-semibold mb-4">ИНТЕГРАЛ-ВКПП</h3>
            <p className="text-sm leading-relaxed text-[var(--color-grey-2)]">
              Модульный пункт досмотра для транспорта, ЧС и охраняемых объектов
            </p>

            <div className="mt-4 text-sm text-[var(--color-grey-2)]">
              <a
                href="mailto:info@integralproject.ru"
                className="block text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              >
                info@integralproject.ru
              </a>
              <p className="mt-2">
                <span className="font-medium">Поставка:</span> РФ и страны ЕАЭС
              </p>
            </div>
          </div>

          {/* Документы */}
          {/* <div>
            <h3 className="text-sm font-semibold mb-4">Документы</h3>
            <ul className="text-sm space-y-3 text-[var(--color-grey-2)]">
              <li>
                <a href="#" className="hover:text-[var(--color-link-hover)]">
                  Главная
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-link-hover)]">
                  Наши решения
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-link-hover)]">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--color-link-hover)]">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Подножие
        <div
          className="mt-10 pt-6 border-t"
          style={{ borderColor: "var(--color-divider)" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--color-grey-2)]">
            <div>
              © {new Date().getFullYear()} INTEGRAL PROJECT. Все права защищены.
            </div>
            <div>Разработка и поддержка: ООО «Чиптон»</div>
          </div>
        </div> */}
      </div>
    </footer>
  )
}
