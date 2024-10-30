import { type HttpResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { type ICacheStore } from "./models";
import { findCacheIndex, getCacheData, setCacheData } from "./utils";
import { MEMENTO_CONFIG } from "./config";
import { isPlatformBrowser } from "@angular/common";
import { type MethodType } from "./types";
import { type MementoConfig } from "./types/memento-config.type";

interface ICachingDataGET {
  path: string;
  method: MethodType;
  params?: any;
  headers?: any;
  body?: any;
}

interface ICachingDataSET extends ICachingDataGET {
  response: HttpResponse<any>;
}

@Injectable({
  providedIn: "root",
})
export class NgMementoService {
  #caches: ICacheStore[];

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    @Inject(MEMENTO_CONFIG) private readonly configs: MementoConfig[]
  ) {
    if (!isPlatformBrowser(this.platformId)) {
      this.configs.forEach((config) => (config.store = "none"));
    }
    this.#caches = getCacheData(this.configs);
  }

  #delete = (index: number, cache: ICacheStore) => {
    const { store, storeKey } = cache;
    this.#caches.splice(index, 1);
    setCacheData({ store, storeKey }, this.#caches);
  };

  get = (cachingData: ICachingDataGET): HttpResponse<any> | undefined => {
    const cacheIndex: number = findCacheIndex(this.#caches, cachingData);

    if (cacheIndex === -1) {
      return undefined;
    }
    const cache: ICacheStore = this.#caches[cacheIndex];
    const isExpired: boolean = Date.now() > cache.expiredDate;
    if (isExpired) {
      this.#delete(cacheIndex, cache);
      return undefined;
    }
    return cache.response;
  };

  set = (cachingData: ICachingDataSET) => {
    const { path } = cachingData;

    const config: MementoConfig | undefined = this.configs.find(
      (config) => config.path === path
    );

    if (!config) {
      return;
    }

    const { expireTimeAsMilliSeconds, store, storeKey } = config;

    const expiredDate: number = Date.now() + expireTimeAsMilliSeconds;

    const cache: ICacheStore = {
      ...cachingData,
      expiredDate,
      store,
      storeKey,
    };
    this.#caches = [...this.#caches, cache];

    if (store === "none" || !isPlatformBrowser(this.platformId)) {
      return;
    }

    setCacheData({ store, storeKey }, this.#caches);
  };
}
