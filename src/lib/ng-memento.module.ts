import { ModuleWithProviders, NgModule } from "@angular/core";
import { IMementoConfig } from "./models";
import { MEMENTO_CONFIG } from "./config";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MementoInterceptor } from "./helpers";
import { MementoConfig, StoreType } from "./types";
import { KEYS } from "./enums";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MementoInterceptor,
      multi: true,
    },
  ],
})
export class NgMementoModule {
  private static prepareConfig = (config: IMementoConfig): MementoConfig[] => {
    const store: StoreType = config.store || "none";
    const storeKey: string = config.storeKey || KEYS.STORE;

    const { expireTimeAsMilliSeconds, paths } = config;

    if (!expireTimeAsMilliSeconds && expireTimeAsMilliSeconds !== 0) {
      throw new Error(
        "Cannot read property of IMementoConfig: 'expireTimeAsMilliSeconds'"
      );
    }

    if (!paths) {
      throw new Error("Cannot read property of IMementoConfig: 'paths'");
    }

    return paths
      .map((p) => {
        return {
          expireTimeAsMilliSeconds:
            p.expireTimeAsMilliSeconds || expireTimeAsMilliSeconds,
          methods: p.methods,
          path: p.path,
          store: p.store || store,
          storeKey: p.storeKey || storeKey,
        };
      })
      .filter((p) => !!p.expireTimeAsMilliSeconds);
  };

  static forRoot(config: IMementoConfig): ModuleWithProviders<NgMementoModule> {
    const preparedConfig = this.prepareConfig(config);
    return {
      ngModule: NgMementoModule,
      providers: [{ provide: MEMENTO_CONFIG, useValue: preparedConfig }],
    };
  }
}
