import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MyLatformBrowser } from '../../services/platform-browser/my-platform-browser';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let myLatformBrowser: MyLatformBrowser = inject(MyLatformBrowser);

  if (localStorage.getItem('userToken')) {
    if (myLatformBrowser.checkPlatformBrowser()) {
      let header: any = { token: localStorage.getItem('userToken')! };
      req = req.clone({
        setHeaders: header,
      })
    }
  }

  return next(req);
};
