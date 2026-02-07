import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/services/product/product';
import { ProductResponse } from '../../../core/interfaces/product-response';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {

  pId = signal<string | null>(null);
  oneProduct = signal<ProductResponse>({} as ProductResponse);

  // private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private product: Product = inject(Product);

  constructor() {
    effect(() => {
      this.product.getSpecProducts(this.pId()).subscribe({
        next: (res) => {
          this.oneProduct.set(res.data)
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        },

      })
    })
  }


  ngOnInit(): void {
    // TO get id from URL with activatedRoute service 
    this.activatedRoute.paramMap.subscribe((pId) =>{
      console.log('===============' , pId);
      this.pId.set(pId.get('id'));
    })
  }


}
