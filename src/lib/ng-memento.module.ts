import { ModuleWithProviders, NgModule } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mementoInterceptor } from "./helpers";
import { type IMementoConfig } from "./models";
import { MEMENTO_CONFIG } from "./config";
import { KEYS } from "./enums";
import { type StoreType } from "./types";
import { type MementoConfig } from "./types/memento-config.type";

@NgModule({
  declarations: [],
  imports: [],
  providers: [provideHttpClient(withInterceptors([mementoInterceptor]))],
  exports: [],
})
export class NgMementoModule {
  private static prepareConfig = (config: IMementoConfig): MementoConfig[] => {
    const expireTimeAsMilliSeconds = config.expireTimeAsMilliSeconds || 0;
    const store: StoreType = config.store || "none";
    const storeKey: string = config.storeKey || KEYS.STORE;

    const { paths } = config;

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
