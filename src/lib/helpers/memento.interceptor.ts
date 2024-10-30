import { Inject, Injectable } from "@angular/core";
import {
  type HttpInterceptor,
  type HttpEvent,
  type HttpHandler,
  type HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { type Observable, of, tap } from "rxjs";
import { MEMENTO_CONFIG } from "../config";
import { NgMementoService } from "../ng-memento.service";
import { getHeaders, getParams } from "../utils";
import { type MementoConfig, type MethodType } from "../types";

@Injectable()
export class MementoInterceptor implements HttpInterceptor {
  constructor(
    @Inject(MEMENTO_CONFIG) private readonly configs: MementoConfig[],
    private readonly service: NgMementoService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { urlWithParams, body } = req;
    const method = req.method as MethodType;

    const { pathname, searchParams } = new URL(urlWithParams);

    const params = getParams(searchParams);
    const headers = getHeaders(req.headers);

    const [, ...endPathName] = pathname.split("/");
    const path = endPathName.join("/");

    const config = this.configs
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
      return next.handle(req);
    }
    const cachedResponse = this.service.get({
      path,
      method,
      params,
      headers,
      body,
    });
    if (!!cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap((response) => {
        response instanceof HttpResponse &&
          this.service.set({
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
  }
}
