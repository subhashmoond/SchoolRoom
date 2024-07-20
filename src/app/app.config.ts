import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { JWTtokenInterceptor } from './core/interceptors/jwttoken.interceptor';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return  new  TranslateHttpLoader(httpClient, './assets/translations/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideStore(),
    provideAnimations(),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom([
      HttpClientModule,
      TranslateModule.forRoot(provideTranslation())
    ]),
    provideHttpClient(withInterceptorsFromDi()),  
        {
            provide:HTTP_INTERCEPTORS,
            useClass:JWTtokenInterceptor,
            multi:true
        }
  ]
};
