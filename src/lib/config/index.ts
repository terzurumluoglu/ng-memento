import { InjectionToken } from "@angular/core";
import { IMementoConfig } from "../models";

export const MEMENTO_CONFIG: InjectionToken<IMementoConfig> =
  new InjectionToken("MEMENTO_CONFIG");
