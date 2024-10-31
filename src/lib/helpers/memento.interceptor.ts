import { inject } from "@angular/core";
import {
  type HttpRequest,
  type HttpInterceptorFn,
  type HttpHandlerFn,
  HttpResponse,
} from "@angular/common/http";

import { MEMENTO_CONFIG } from "../config";
import { NgMementoService } from "../ng-memento.service";
import { getHeaders, getParams } from "../utils";
import { type MethodType } from "../types";
import { of, tap } from "rxjs";

export const mementoInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const configs = inject(MEMENTO_CONFIG);
  const service = inject(NgMementoService);

  const { urlWithParams, body } = req;
  const method = req.method as MethodType;

  const { pathname, searchParams } = new URL(urlWithParams);

  const params = getParams(searchParams);
  const headers = getHeaders(req.headers);

  const [, ...endPathName] = pathname.split("/");
  const path = endPathName.join("/");

  const config = configs
    .filter((config) => config.methods.includes(method))
    .find((config) => {
      if (config.path.endsWith("/*")) {
        const [validPath] = config.path.split("/*");
        return path.startsWith(validPath);
      } else {
        return path === config.path;
      }
    });

  if (!config) {
    return next(req);
  }
  const cachedResponse = service.get({ path, method, params, headers, body });
  if (!!cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((response) => {
      response instanceof HttpResponse &&
        service.set({
          config,
          path,
          method,
          response,
          params,
          headers,
          body,
        });
    })
  );
};
