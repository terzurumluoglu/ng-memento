import { IMethodPath } from "./IMethodPath";

export interface IMementoConfig {
  expireTimeAsMilliSeconds: number;
  paths: IMethodPath[];
}
