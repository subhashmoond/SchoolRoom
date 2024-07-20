import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UrlHandlerService } from '../../shared/services/url-handler.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let urlHandlerService = inject(UrlHandlerService)
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn == 'false') {
    urlHandlerService.setStoreUrl(state.url);
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return true;

};
