import { type StoreType } from "../types/store.type";
import { type IMethodPath } from "./IMethodPath";

export interface IMementoConfig {
  expireTimeAsMilliSeconds?: number;
  paths: IMethodPath[];
  store?: StoreType;
  storeKey?: string;
}
