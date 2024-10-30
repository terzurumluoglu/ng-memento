import { type HttpResponse } from "@angular/common/http";
import { type StoreType, type MethodType } from "../types";

export interface ICacheStore extends ICache {
  store: StoreType;
  storeKey: string;
}
export interface ICache {
  response: HttpResponse<any>;
  expiredDate: number;
  path: string;
  method: MethodType;
  params?: any;
  headers?: any;
  body?: any;
}
