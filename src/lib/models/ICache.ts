import { HttpResponse } from "@angular/common/http";
import { MethodType } from "../types";

export interface ICache {
  response: HttpResponse<any>;
  expiredDate: number;
  path: string;
  method: MethodType;
  params?: any;
  headers?: any;
  body?: any;
}
