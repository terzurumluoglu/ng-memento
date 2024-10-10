import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { MEMENTO_CONFIG } from "./config";
import { ICache, IConfig } from "./models";
import { findCacheIndex } from "./utils";

@Injectable({
  providedIn: "root",
})
export class NgMementoService {
  #caches: ICache[] = [];

  constructor(@Inject(MEMENTO_CONFIG) private readonly config: IConfig) {}

  #delete = (index: number) => {
    this.#caches.splice(index, 1);
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
  };
}
