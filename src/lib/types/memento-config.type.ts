import { type MethodType } from "./method.type";
import { type StoreType } from "./store.type";

export type MementoConfig = {
  expireTimeAsMilliSeconds: number;
  methods: MethodType[];
  path: string;
  store: StoreType;
  storeKey: string;
};
