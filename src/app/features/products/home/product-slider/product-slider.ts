import { Component, Input } from '@angular/core';
import { ProductResponse } from '../../../../core/interfaces/product-response';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-product-slider',
  imports: [CarouselModule],
  templateUrl: './product-slider.html',
  styleUrl: './product-slider.scss'
})
export class ProductSlider {

  @Input() products: ProductResponse[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: true
  }



}
