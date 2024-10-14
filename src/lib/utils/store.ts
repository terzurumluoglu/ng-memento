import { HttpResponse } from "@angular/common/http";
import { ICache, IMementoConfig } from "../models";
import { isJsonString } from "./is-json-string";

const storage = (key: "local" | "session") => {
  return key === "local" ? localStorage : sessionStorage;
};

export const deleteCacheData = (config: IMementoConfig): void => {
  const { store, storeKey } = config;
  storage(store as "local" | "session").removeItem(storeKey as string);
};

export const getCacheData = (config: IMementoConfig): ICache[] => {
  const { store, storeKey } = config;
  if (store === "none") {
    return [];
  }

  const cacheData = isJsonString<ICache[]>(
    storage(store as "local" | "session").getItem(storeKey as string) || ""
  );
  if (!cacheData) {
    return [];
  }
  return cacheData.map((data: ICache) => {
    const {
      response: { body, headers, status, statusText, url },
    } = data;
    data.response = new HttpResponse<any>({
      body,
      headers,
      status,
      statusText,
      url: url as string,
    });
    return data;
  });
};

export const setCacheData = (config: IMementoConfig, caches: ICache[]) => {
  const { store, storeKey } = config;
  storage(store as "local" | "session").setItem(
    storeKey as string,
    JSON.stringify(caches)
  );
};
