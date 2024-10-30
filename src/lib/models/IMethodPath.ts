import { type MethodType, type StoreType } from "../types";

export interface IMethodPath {
  expireTimeAsMilliSeconds?: number;
  methods: MethodType[];
  path: string;
  store?: StoreType;
  storeKey?: string;
}
