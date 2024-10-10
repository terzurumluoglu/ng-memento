import { InjectionToken } from "@angular/core";
import { IConfig } from "../models";

export const MEMENTO_CONFIG: InjectionToken<IConfig> = new InjectionToken(
  "MEMENTO_CONFIG"
);
