export const isJsonString = <T>(str: string) => {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    return undefined as T;
  }
};
