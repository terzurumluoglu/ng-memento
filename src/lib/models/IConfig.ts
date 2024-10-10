import { IMethodPath } from "./IMethodPath";

export interface IConfig {
  expireTimeAsMilliSeconds: number;
  paths: IMethodPath[];
}
