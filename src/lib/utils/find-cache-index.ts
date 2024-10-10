import { ICache } from "../models";
import { isDeepEqual } from "./is-deep-equal";

export const findCacheIndex = (
  caches: ICache[],
  obj: {
    path: string;
    params?: any;
    headers?: any;
    body?: any;
  }
): number => {
  return caches.findIndex((cache) =>
    Object.keys(obj).every((key) =>
      isDeepEqual(
        cache[key as keyof typeof cache],
        obj[key as keyof typeof obj]
      )
    )
  );
};
