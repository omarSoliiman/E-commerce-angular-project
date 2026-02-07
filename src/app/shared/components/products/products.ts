import { Component, inject, Input } from '@angular/core';
import { ProductResponse } from '../../../core/interfaces/product-response';
import { RouterLink  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart-service/cart';
import { HiiPipe } from '../../../core/pipes/hii-pipe';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-products',
  imports: [RouterLink , HiiPipe , UpperCasePipe],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {

  @Input() products: ProductResponse[] = [];

  private cart: CartService = inject(CartService);
  constructor(private toastr: ToastrService) { }

  addToCart(pId: string) {
    console.log(pId);
    this.cart.addProductToCart(pId).subscribe({
      next: (res) => {
        // alert(pId + res.message)
        this.toastr.success( "Cart Options !",  res.message)
      },
      error: (err) => {
        console.log(err);

      }
    })

    



    // this.cart.addProductToCart().subscribe({
    //   next: (res)=>{

    //   }
    // })
  }





  // navigateToDetails() {
  //   this.router.navigate(['product-details'])
  // }


}
