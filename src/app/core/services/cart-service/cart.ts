import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private httpClient: HttpClient = inject(HttpClient);

  private userTokenHeader: any = { token: localStorage.getItem('userToken') };
  

  addProductToCart(pId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}cart`, { productId: pId })
  }

  updateCartQuantity(pId: string, pCount: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}cart/${pId}`,
      { "count": pCount },
    )
  }

  getAllCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}cart`)
  }

  removeSpecCartItem(pId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart/${pId}`)
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart`)
  }

  

}
