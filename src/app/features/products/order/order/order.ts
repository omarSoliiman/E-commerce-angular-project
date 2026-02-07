import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOut } from '../../../../core/services/checkout/check-out';

@Component({
  selector: 'app-order',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order implements OnInit {

  cartId = signal<string | null>('');

  private checkOutService: CheckOut = inject(CheckOut);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.cartId.set(p.get('cartId'));
    })
  }

  addressForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  checkoutSubmit() {
    this.checkOutService.checkOutSession(this.cartId(), this.addressForm.value).subscribe({
      next: (res) => {
        console.log(res)
        window.location.href = res.session.url
      },
      error: (err) => {
        console.log(err)

      }
    })

  }




}
