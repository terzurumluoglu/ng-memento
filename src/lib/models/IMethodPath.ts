export type method = "GET" | "POST" | "PUT" | "PATCH";

export interface IMethodPath {
  method: method[];
  path: string;
}
