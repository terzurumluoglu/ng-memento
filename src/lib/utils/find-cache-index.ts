import { type ICacheStore } from "../models";
import { type MethodType } from "../types";
import { isDeepEqual } from "./is-deep-equal";

export const findCacheIndex = (
  caches: ICacheStore[],
  obj: {
    path: string;
    method: MethodType;
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
