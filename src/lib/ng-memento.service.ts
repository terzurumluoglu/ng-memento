import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ICache, IMementoConfig } from "./models";
import { findCacheIndex } from "./utils";
import { KEYS } from "./enums";
import { deleteCacheData, getCacheData, setCacheData } from "./utils/store";
import { MEMENTO_CONFIG } from "./config";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class NgMementoService {
  #caches: ICache[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(MEMENTO_CONFIG) private readonly config: IMementoConfig
  ) {
    if (!this.config.store || !isPlatformBrowser(this.platformId)) {
      this.config.store = "none";
    }

    if (!this.config.storeKey) {
      this.config.storeKey = KEYS.STORE;
    }

    this.#caches = getCacheData(config);
  }

  #delete = (index: number) => {
    this.#caches.splice(index, 1);
    deleteCacheData(this.config);
  };

  get = (cachingData: {
    path: string;
    params?: any;
    headers?: any;
    body?: any;
  }): HttpResponse<any> | undefined => {
    const cacheIndex: number = findCacheIndex(this.#caches, cachingData);

    if (cacheIndex === -1) {
      return undefined;
    }
    const cache: ICache = this.#caches[cacheIndex];
    const isExpired: boolean = Date.now() > cache.expiredDate;
    if (isExpired) {
      this.#delete(cacheIndex);
      return undefined;
    }
    return cache.response;
  };

  set = (cachingData: {
    body?: any;
    headers?: any;
    params?: any;
    path: string;
    response: HttpResponse<any>;
  }) => {
    const { expireTimeAsMilliSeconds } = this.config;
    const expiredDate: number = Date.now() + expireTimeAsMilliSeconds;
    const cache: ICache = {
      ...cachingData,
      expiredDate,
    };
    this.#caches = [...this.#caches, cache];
    if (this.config.store === "none" || !isPlatformBrowser(this.platformId)) {
      return;
    }
    setCacheData(this.config, this.#caches);
  };
}
