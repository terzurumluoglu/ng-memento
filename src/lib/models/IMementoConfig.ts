import { StoreType } from "../types/store.type";
import { IMethodPath } from "./IMethodPath";

export interface IMementoConfig {
  expireTimeAsMilliSeconds: number;
  paths: IMethodPath[];
  store?: StoreType;
  storeKey?: string;
}
