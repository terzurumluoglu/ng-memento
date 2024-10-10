export const isDeepEqual = (current: any, target: any): boolean => {
  if (current === target) {
    return true;
  }

  if ([current, target].some((ct) => ct === null || typeof ct !== "object")) {
    return false;
  }

  if (Array.isArray(current) && Array.isArray(target)) {
    if (current.length !== target.length) {
      return false;
    }

    const sortedCurrent = [...current].sort();
    const sortedTarget = [...target].sort();

    return sortedCurrent.every((item, index) =>
      isDeepEqual(item, sortedTarget[index])
    );
  }

  if (current instanceof Map && target instanceof Map) {
    if (current.size !== target.size) {
      return false;
    }
    for (const [key, value] of current) {
      if (!target.has(key) || !isDeepEqual(value, target.get(key))) {
        return false;
      }
    }
    return true;
  }

  if (current instanceof Set && target instanceof Set) {
    if (current.size !== target.size) {
      return false;
    }
    for (const item of current) {
      if (!target.has(item)) {
        return false;
      }
    }
    return true;
  }

  const currentKeys = Object.keys(current);
  const targetKeys = Object.keys(target);

  if (currentKeys.length !== targetKeys.length) {
    return false;
  }

  for (const key of currentKeys) {
    if (!(key in target)) {
      return false;
    }

    const val1 = (current as Record<string, unknown>)[key];
    const val2 = (target as Record<string, unknown>)[key];

    if (!isDeepEqual(val1, val2)) {
      return false;
    }
  }

  return true;
};
