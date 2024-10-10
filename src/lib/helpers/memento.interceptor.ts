import { inject } from "@angular/core";
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from "@angular/common/http";

import { MEMENTO_CONFIG } from "../config";

export const mementoInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const config = inject(MEMENTO_CONFIG);
  console.log(config);

  return next(req);
};
