import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MyLatformBrowser } from '../services/platform-browser/my-platform-browser';

export const authGuard: CanActivateFn = (route, state) => {

  // Service inject 
  let router: Router = inject(Router);
  let myLatformBrowser: MyLatformBrowser = inject(MyLatformBrowser);

  if (myLatformBrowser.checkPlatformBrowser()) {
    if (localStorage.getItem('userToken')) {
      return true
    }
  }
  return router.createUrlTree(['/login'])
};
