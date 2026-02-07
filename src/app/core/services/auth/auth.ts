import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginrData, RegisterData } from '../../interfaces/register-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { User } from '../../interfaces/user';
import { MyLatformBrowser } from '../platform-browser/my-platform-browser';


@Injectable({
  providedIn: 'root'
})
export class Auth {


  userData = new BehaviorSubject(null);
  // userData = signal<any>(null);
  private httpClient: HttpClient = inject(HttpClient);
  private myLatformBrowser: MyLatformBrowser = inject(MyLatformBrowser);

  // SSR
  constructor() {
    if (this.myLatformBrowser.checkPlatformBrowser()) {
      if (localStorage.getItem('userToken')) {
        this.setUserData()
      }
    }
  }

  registerAPI(bodyData: RegisterData): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl} auth/signup`,
      bodyData
    );
  }

  loginAPI(LoginrData: LoginrData): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signin`, LoginrData)
  }

  // loginAPI(loginrData : LoginrData): Observable<any>{
  //   return this.httpClient.post(
  //     `https://ecommerce.routemisr.com/api/v1/auth/signin`, 
  //     loginrData
  //   );
  // }

  setUserData() {
    this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
    // this.userData().set(jwtDecode(localStorage.getItem('userToken')!))
  }

  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPasswords`, { email })
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}auth/resetPassword`, { email, newPassword })
  }

  verifyResetCode(resetCode: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/verifyResetCode`, { resetCode })
  }
}
