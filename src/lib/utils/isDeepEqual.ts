export const isDeepEqual = (
  current: any,
  target: any,
  seen: Set<any> = new Set()
): boolean => {
  // Eğer aynı referanssa, doğrudan true döndür
  if (current === target) return true;

  // Eğer biri null ya da diğeri bir nesne değilse, false döndür
  if (
    current == null ||
    target == null ||
    typeof current !== "object" ||
    typeof target !== "object"
  ) {
    return false;
  }

  // Döngüsel referansları kontrol et
  if (seen.has(current) || seen.has(target)) {
    return false;
  }
  seen.add(current);
  seen.add(target);

  // Array kontrolü
  const currentIsArray = Array.isArray(current);
  const targetIsArray = Array.isArray(target);
  if (currentIsArray !== targetIsArray) {
    return false;
  }

  // Anahtarları al
  const currentKeys = Object.keys(current);
  const targetKeys = Object.keys(target);

  // Anahtar uzunlukları eşit değilse, false döndür
  if (currentKeys.length !== targetKeys.length) {
    return false;
  }

  // Anahtarlar üzerinde döngü
  for (const key of currentKeys) {
    // Anahtarın target'da olup olmadığını kontrol et
    if (!target.hasOwnProperty(key)) {
      return false;
    }

    // Derin eşitlik kontrolü
    if (!isDeepEqual(current[key], target[key], seen)) {
      return false;
    }
  }

  return true;
};
