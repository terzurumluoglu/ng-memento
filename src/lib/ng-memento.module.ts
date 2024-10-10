import { ModuleWithProviders, NgModule } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { mementoInterceptor } from "./helpers";
import { IConfig } from "./models";
import { MEMENTO_CONFIG } from "./config";

@NgModule({
  declarations: [],
  imports: [],
  providers: [provideHttpClient(withInterceptors([mementoInterceptor]))],
  exports: [],
})
export class NgMementoModule {
  static forRoot(config: IConfig): ModuleWithProviders<NgMementoModule> {
    return {
      ngModule: NgMementoModule,
      providers: [{ provide: MEMENTO_CONFIG, useValue: config }],
    };
  }
}
