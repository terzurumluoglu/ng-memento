import { ModuleWithProviders, NgModule } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mementoInterceptor } from "./helpers";
import { IMementoConfig } from "./models";
import { MEMENTO_CONFIG } from "./config";

@NgModule({
  providers: [provideHttpClient(withInterceptors([mementoInterceptor]))],
})
export class NgMementoModule {
  static forRoot(config: IMementoConfig): ModuleWithProviders<NgMementoModule> {
    return {
      ngModule: NgMementoModule,
      providers: [{ provide: MEMENTO_CONFIG, useValue: config }],
    };
  }
}
