import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckOut {

  private httpClient: HttpClient = inject(HttpClient)


  // createCashOrder(cartId : string) : Observable<any>{
  //   return this.httpClient.post(`${environment.baseUrl}orders` , cartId);
  // }


  checkOutSession(cartId: string | null, addressValue: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}orders/checkout-session/${cartId}?url=${environment.ecommURL}`,
      { "shippingAddress": addressValue, }
    )
  }


}
