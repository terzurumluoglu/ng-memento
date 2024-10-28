import { HttpResponse } from "@angular/common/http";
import { type ICacheStore, type ICache } from "../models";
import { isJsonString } from "./is-json-string";
import { type StoreType } from "../types";
import { type MementoConfig } from "../types/memento-config.type";

type localSession = "local" | "session";

const storage = (key: localSession) => {
  return key === "local" ? localStorage : sessionStorage;
};

export const getCacheData = (configs: MementoConfig[]): ICacheStore[] => {
  const withoutNone = configs
    .filter((config) => config.store !== "none")
    .reduce(
      (acc: { [key in localSession]: string[] }, config: MementoConfig) => {
        const { storeKey } = config;
        const store: localSession = config.store as localSession;
        if (!!acc[store]) {
          !acc[store].includes(storeKey) &&
            (acc[store] = [...acc[store], storeKey]);
        } else {
          acc[store] = [storeKey];
        }
        return acc;
      },
      { local: [], session: [] }
    );

  return Object.keys(withoutNone)
    .map((key) => key as localSession)
    .filter((key) => !!withoutNone[key].length)
    .reduce((acc1: ICacheStore[], store: localSession) => {
      return [
        ...acc1,
        ...withoutNone[store].reduce(
          (acc2: ICacheStore[], storeKey: string) => {
            const cacheData = isJsonString<ICache[]>(
              storage(store as localSession).getItem(storeKey) || ""
            );
            if (!cacheData) {
              return [...acc2];
            }
            return [
              ...acc2,
              ...cacheData.map((data: ICache) => {
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
                return {
                  ...data,
                  store,
                  storeKey,
                };
              }),
            ];
          },
          []
        ),
      ];
    }, []);
};

export const setCacheData = (
  { store, storeKey }: { store: StoreType; storeKey: string },
  caches: ICacheStore[]
) => {
  const cacheData = caches
    .filter((c) => c.store === store && c.storeKey === storeKey)
    .map((cache) => {
      const { store, storeKey, ...others } = cache;
      return others;
    });
  storage(store as "local" | "session").setItem(
    storeKey as string,
    JSON.stringify(cacheData)
  );
};
