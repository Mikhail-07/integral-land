import React from "react"

const specificationsData = [
  { key: "Габаритные размеры (Ш×Г×В)", value: "9800 × 6000 × 2700 мм" },
  { key: "Площадь помещений", value: "58,8 м²" },
  { key: "Масса модуля", value: "До 12 тонн" },
  {
    key: "Время монтажа",
    value: "До 4 часов при наличии подготовленного основания",
  },
  {
    key: "Условия установки",
    value: "Песчаная подушка, бетонная плита или винтовые сваи",
  },
  {
    key: "Температурный диапазон",
    value: "от −40 до +50 °C (в зависимости от исполнения)",
  },
  {
    key: "Электропитание",
    value: "220/380 В, 50 Гц, глухозаземлённая нейтраль",
  },
  { key: "Макс. потребляемая мощность", value: "до 35 кВт" },
  {
    key: "Отопление / вентиляция",
    value: "Электрическое / естественное и кондиционирование",
  },
  {
    key: "Оснащение",
    value:
      "Полный комплект досмотрового оборудования (рентген, металлодетекторы, радиационный контроль, биометрия, СКУД, СВН, АПС, ОС)",
  },
  {
    key: "Разделение потоков",
    value: "Два помещения: вход/досмотр и отдельный выход с турникетом",
  },
  { key: "Срок службы конструкции", value: "Не менее 10 лет" },
]

export default function Specifications() {
  return (
    <section
      id="specifications"
      className="w-full h-full pt-20 bg-brand-deep-teal relative z-20 "
    >
      <div className="max-w-6xl mx-auto px-6 max-w-3xl">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl  text-brand-amber mb-6 font-pt-serif">
          Технические характеристики
        </h2>
        <p className="font-pt-sans text-brand-white mb-10 ">
          Ниже — ключевые параметры модуля ВКПП тип 1х. Подробные чертежи, схемы
          и паспорта оборудования доступны в комплекте документации.
        </p>

        {/* Таблица */}
        <div className="overflow-x-auto border-divider">
          <table className="w-full border-collapse">
            <thead className="border-b-2">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Параметр</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Значение / Характеристика
                </th>
              </tr>
            </thead>
            <tbody className="border-b-2">
              {specificationsData.map((spec, idx) => (
                <tr
                  key={`spec-${idx}-${spec.key}`}
                  className="border-t border-divider"
                >
                  <td className="px-4 py-3 text-brand-white font-medium align-top w-1/3">
                    {spec.key}
                  </td>
                  <td className="px-4 py-3 ">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
