import { inject } from "@angular/core";
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpResponse,
} from "@angular/common/http";

import { MEMENTO_CONFIG } from "../config";
import { NgMementoService } from "../ng-memento.service";
import { getHeaders, getParams } from "../utils";
import { MethodType } from "../types";
import { of, tap } from "rxjs";

export const mementoInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const config = inject(MEMENTO_CONFIG);
  const service = inject(NgMementoService);

  const { urlWithParams, body } = req;
  const method = req.method as MethodType;

  const { pathname, searchParams } = new URL(urlWithParams);

  const params = getParams(searchParams);
  const headers = getHeaders(req.headers);

  const [, ...endPathName] = pathname.split("/");
  const path = endPathName.join("/");

  const condition = config.paths
    .filter((p) => p.methods.includes(method))
    .some((u) => {
      if (u.path.endsWith("/*")) {
        const [validPath] = u.path.split("/*");
        return path.startsWith(validPath);
      } else {
        return path === u.path;
      }
    });

  if (!condition) {
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
