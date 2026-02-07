import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../core/services/cart-service/cart';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  allProudcts = signal<any[]>([]);
  totalPrice = signal<number>(0);
  cartId = signal<string>('');

  private cart: CartService = inject(CartService);
  private router : Router = inject(Router);


  constructor(private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getAllCart();
  }

  getAllCart() {
    this.cart.getAllCart().subscribe({
      next: (res) => {
        this.allProudcts.set(res.data.products);
        this.totalPrice.set(res.data.totalCartPrice);
        console.log(this.allProudcts());
        this.cartId.set(res.cartId);
        console.log(res);
        
      },
      error: (err) => { console.log(err) }
    })
  }

  removeItem(pId: string) {
    this.cart.removeSpecCartItem(pId).subscribe({
      next: (res) => {
        this.toastr.success("Item Deleted Successfully");
        this.getAllCart();
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  updateItem(pId: string, pCount: number) {
    if (pCount <= 0) {
      this.removeItem(pId);
    } else {
      this.cart.updateCartQuantity(pId, pCount).subscribe({
        next: () => {
          this.toastr.success("Item Updated Successfully");
          this.getAllCart();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  removeAllItemsCart() {
    this.cart.clearUserCart().subscribe({
      next: (res) => {
        this.toastr.success("Cart Cleared Successfully");
        this.getAllCart();
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  requestOrder(){
    this.router.navigate(['/order' , this.cartId()])
  }



}
