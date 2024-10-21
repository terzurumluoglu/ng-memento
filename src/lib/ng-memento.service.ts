import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ICache, IMementoConfig } from "./models";
import {
  deleteCacheData,
  findCacheIndex,
  getCacheData,
  setCacheData,
} from "./utils";
import { KEYS } from "./enums";
import { MEMENTO_CONFIG } from "./config";
import { methodType } from "./types";

@Injectable({
  providedIn: "root",
})
export class NgMementoService {
  #caches: ICache[];

  constructor(@Inject(MEMENTO_CONFIG) private readonly config: IMementoConfig) {
    if (!this.config.store) {
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
    method: methodType;
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
    method: methodType;
    response: HttpResponse<any>;
  }) => {
    const { expireTimeAsMilliSeconds } = this.config;
    const expiredDate: number = Date.now() + expireTimeAsMilliSeconds;
    const cache: ICache = {
      ...cachingData,
      expiredDate,
    };
    this.#caches = [...this.#caches, cache];
    if (this.config.store === "none") {
      return;
    }
    setCacheData(this.config, this.#caches);
  };
}
