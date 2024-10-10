import { HttpHeaders } from "@angular/common/http";

export const getParams = (params: URLSearchParams) =>
  getParamsOrHeaders(params);

export const getHeaders = (headers: HttpHeaders) => getParamsOrHeaders(headers);

const getParamsOrHeaders = (data: URLSearchParams | HttpHeaders) => {
  const keysArray: string[] = Array.from((data as any).keys());

  if (!keysArray.length) {
    return undefined;
  }
  return keysArray.reduce((acc: any, item: any) => {
    return {
      ...acc,
      [item]: data.getAll(item),
    };
  }, {});
};
