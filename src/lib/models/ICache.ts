import { HttpResponse } from "@angular/common/http";

export interface ICache {
  response: HttpResponse<any>;
  expiredDate: number;
  path: string;
  params?: any;
  headers?: any;
  body?: any;
}
