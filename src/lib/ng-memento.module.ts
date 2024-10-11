import { ModuleWithProviders, NgModule } from "@angular/core";
import { IMementoConfig } from "./models";
import { MEMENTO_CONFIG } from "./config";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MementoInterceptor } from "./helpers";

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
  static forRoot(config: IMementoConfig): ModuleWithProviders<NgMementoModule> {
    return {
      ngModule: NgMementoModule,
      providers: [{ provide: MEMENTO_CONFIG, useValue: config }],
    };
  }
}
