import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, retry, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Rxjs {

  private $products: Observable<any> | null = null;
  private httpClient: HttpClient = inject(HttpClient);

  // Map() ==> Modifying API res 
  getModifyingCat(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}categories`).pipe(

      map((catRes) =>
        catRes.data.map((oneCat: any) => {
          let cat: any = {};
          cat.name = oneCat.name;
          cat.image = oneCat.image;
          return cat;
        })
      )
    )
  }


  // Useful if u used API based on another API response 
  // getSpecProduct(pId: string): Observable<any> {
  //   return this.httpClient.get<any>(`${environment.baseUrl}products/${pId}`).pipe(
  //     mergeMap(  (proRes) => {
  //       this.httpClient.get<any>(
  //         `${environment.baseUrl}categories/${proRes.data.category._id}`
  //       )
  //     })
  //   )
  // }

  // Forkjoin()
  hitAPIWithForkJoin(): Observable<any> {
    return forkJoin({
      products: this.httpClient.get(`${environment.baseUrl}products`),
      Categorie: this.httpClient.get(`${environment.baseUrl}categories`)
    })
  }

  handleError(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products`).pipe(
      catchError((err) => {
        console.log('Error is : ' + err)
        return throwError(() => new Error(err))
      })
    )
  }

  tapFun(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}products`).pipe(
      tap((res) => console.log(res.data))
    )
  }



  // To cache Response 
  shareReplayFun(): Observable<any> {
    if (!this.$products) {
      this.$products = this.httpClient.get(`${environment.baseUrl}products`)
        .pipe(shareReplay(1))
    }

    return this.$products;

  }

  getRetry(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products`).pipe(
      retry(3),
      catchError((err) => {
        console.log('error after hit 3 times');
        return throwError(() => { new Error(err) })
      })
    )
  }

















}
