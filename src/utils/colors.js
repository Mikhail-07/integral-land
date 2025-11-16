// Константы цветов бренда
export const COLORS = {
  // Основные цвета бренда
  brand: {
    deepTeal: "#0E403F",
    white: "#FFFFFF",
    amber: "#E1B425",
  },

  // Цвета ссылок
  link: {
    default: "#4C9DCB",
    hover: "#73B6E0",
    active: "#3679A4",
  },

  // UI цвета
  ui: {
    success: "#5FB57B",
    error: "#C74343",
    warning: "#E29F10",
  },

  // Оттенки серого
  grey: {
    1: "#9CA6A4",
    2: "#F3F5F4",
    3: "#F0F0F0",
    4: "#DADADA",
    5: "#D0D4D2",
    6: "#B8C1BF",
    7: "#9CA6A4",
    8: "#5F6F6E",
  },

  // Дополнительные цвета для FeaturesGrid
  features: {
    background: "#F8F9F9",
    text: "#5F6F6E",
    title: "#000000",
  },

  // Разделители и панели
  divider: "#2C4A48",
  panel: "#142C2B",
}

// Утилитарные функции для работы с цветами
export const getColor = (path) => {
  return path.split(".").reduce((obj, key) => obj?.[key], COLORS)
}

export const getBrandColor = (name) => {
  return COLORS.brand[name] || COLORS.brand.deepTeal
}

export const getGreyColor = (level) => {
  return COLORS.grey[level] || COLORS.grey[1]
}
