import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../core/services/product/product';
import { MainSlider } from "./main-slider/main-slider";
import { ProductSlider } from "./product-slider/product-slider";
import { Products } from "../../../shared/components/products/products";
import { ProductResponse } from '../../../core/interfaces/product-response';
import { Rxjs } from '../../../core/services/rxjs-test/rxjs';


@Component({
  selector: 'app-home',
  imports: [MainSlider, ProductSlider, Products],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  allProducts = signal<ProductResponse[]>([]);
  private product: Product = inject(Product);
  private rxjs: Rxjs = inject(Rxjs)


  ngOnInit(): void {


    // this.product.getAllProducts().subscribe({
    //   next: (res) => {
    //     this.allProducts.set(res.data);
    //     console.log(res.data)
    //   },
    //   error: (err) => { console.log(err) }
    // })


    this.getAllProductsByShareReplay();

  }

  // Use shareReplay to cache response 
  getAllProductsByShareReplay() {
    this.rxjs.shareReplayFun().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

