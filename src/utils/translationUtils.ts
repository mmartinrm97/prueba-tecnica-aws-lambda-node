export function translateAttributes<T>(data: T, translation: Record<keyof T, string>): T {
  const translatedData: T = {} as T;
  for (const key in data) {
    const translatedKey = translation[key] || key; // Traducir la clave, si existe una traducción
    translatedData[translatedKey as keyof T] = data[key]; // Utilizar la clave traducida
  }
  return translatedData;
}