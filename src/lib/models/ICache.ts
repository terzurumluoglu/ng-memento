import { HttpResponse } from "@angular/common/http";
import { methodType } from "../types";

export interface ICache {
  response: HttpResponse<any>;
  expiredDate: number;
  path: string;
  method: methodType;
  params?: any;
  headers?: any;
  body?: any;
}
