import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductResponse, ProductsApiResponse } from '../../interfaces/product-response';


@Injectable({
  providedIn: 'root'
})
export class Product {

  private httpClient: HttpClient = inject(HttpClient)


  getAllProducts(): Observable<ProductsApiResponse> {
    return this.httpClient.get<ProductsApiResponse>(`${environment.baseUrl}products`)
  }


  getSpecProducts(pId: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products/${pId}`)
  }
}
