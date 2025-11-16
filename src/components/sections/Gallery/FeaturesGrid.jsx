import { COLORS } from "../../../utils/colors"

/**
 * Дефолтные данные о преимуществах КПП
 */
const DEFAULT_FEATURES = [
  {
    title: "Быстрый монтаж",
    description:
      "Установка за 4 часа на подготовленной площадке. Подходит для экстренного развёртывания.",
  },
  {
    title: "Работает при −40…+50 °C",
    description:
      "Готов к эксплуатации в любом климате, от Якутии до южных портов.",
  },
  {
    title: "Соответствие нормативам",
    description:
      "Разработан в рамках требований МВД и транспортной безопасности.",
  },
  {
    title: "Многократное использование",
    description:
      "Выдерживает регулярный монтаж и демонтаж без потери герметичности и прочности.",
  },
  {
    title: "Удобная логистика",
    description:
      "Доставляется автотранспортом, по железной дороге или водными маршрутами.",
  },
  {
    title: "Полное оснащение",
    description:
      "Включает рентген-установки, металлоискатели, турникет и систему управления доступом.",
  },
]

// ============================================================================
// КОМПОНЕНТЫ
// ============================================================================

/**
 * Компонент отдельного элемента преимущества
 * @param {Object} props - Пропсы компонента
 * @param {Object} props.item - Данные о преимуществе
 * @param {string} props.item.title - Заголовок преимущества
 * @param {string} props.item.description - Описание преимущества
 * @param {number} props.index - Индекс элемента в массиве
 * @returns {JSX.Element} Компонент элемента преимущества
 */
const FeatureItem = ({ item, index }) => {
  const { title, description } = item

  return (
    <article
      key={`feature-${index}-${title}`}
      className="flex flex-col"
      aria-labelledby={`feature-title-${index}`}
    >
      <h3
        id={`feature-title-${index}`}
        className="text-lg sm:text-xl font-extrabold leading-tight tracking-tight"
        style={{ color: COLORS.features.title }}
      >
        {title}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: COLORS.features.text }}
      >
        {description}
      </p>
    </article>
  )
}

// ============================================================================
// ОСНОВНОЙ КОМПОНЕНТ
// ============================================================================

/**
 * FeaturesGrid - компонент сетки преимуществ КПП
 *
 * Отображает сетку преимуществ КПП в адаптивном формате:
 * - 1 колонка на мобильных устройствах
 * - 2 колонки на планшетах
 * - 3 колонки на десктопах
 *
 * @param {Object} props - Пропсы компонента
 * @param {Array} props.items - Массив элементов преимуществ
 * @returns {JSX.Element} Компонент FeaturesGrid
 */
export default function FeaturesGrid({ items = DEFAULT_FEATURES }) {
  return (
    <section
      aria-label="Преимущества КПП"
      className="py-10 sm:py-16 my-16"
      style={{ backgroundColor: COLORS.features.background }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-10">
          {items.map((item, index) => (
            <FeatureItem
              key={`feature-${index}-${item.title}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
