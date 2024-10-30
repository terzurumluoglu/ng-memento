import { InjectionToken } from "@angular/core";
import { type MementoConfig } from "../types";

export const MEMENTO_CONFIG: InjectionToken<MementoConfig[]> =
  new InjectionToken("MEMENTO_CONFIG");
