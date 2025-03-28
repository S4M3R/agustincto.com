export async function getDictionary(locale: string) {
  const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
  }

  // Default to English if the locale is not supported
  const loadDictionary = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en

  return loadDictionary()
}

