import { Inject, Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { MEMENTO_CONFIG } from "../config";
import { IMementoConfig } from "../models";
import { NgMementoService } from "../ng-memento.service";
import { getHeaders, getParams } from "../utils";
import { methodType } from "../types";

@Injectable()
export class MementoInterceptor implements HttpInterceptor {
  constructor(
    @Inject(MEMENTO_CONFIG) private readonly config: IMementoConfig,
    private readonly service: NgMementoService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { urlWithParams, body } = req;
    const method = req.method as methodType;

    const { pathname, searchParams } = new URL(urlWithParams);

    const params = getParams(searchParams);
    const headers = getHeaders(req.headers);

    const [, ...endPathName] = pathname.split("/");
    const path = endPathName.join("/");

    const condition = this.config.paths
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
      return next.handle(req);
    }
    const cachedResponse = this.service.get({ path, params, headers, body });
    if (!!cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap((response) => {
        response instanceof HttpResponse &&
          this.service.set({
            path,
            response,
            params,
            headers,
            body,
          });
      })
    );
  }
}
