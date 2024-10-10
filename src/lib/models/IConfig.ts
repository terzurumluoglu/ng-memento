export interface IConfig {
  expireTimeAsMilliSeconds: number;
  paths: IMethodPath[];
}

export interface IMethodPath {
  method: method[];
  path: string;
}

export type method = "GET" | "POST" | "PUT" | "PATCH";
