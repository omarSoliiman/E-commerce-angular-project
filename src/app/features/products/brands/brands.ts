import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Rxjs } from '../../../core/services/rxjs-test/rxjs';
import { ChangeColor } from '../../../shared/directives/change-color';


@Component({
  selector: 'app-brands',
  imports: [ChangeColor],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit {

  isActive: boolean = true;
  allBrands = signal<[]>([]);
  


  private rxjs: Rxjs = inject(Rxjs);

  ngOnInit(): void {
    this.forkJoin();
    this.catchErrorFun();
    this.hamada();
  }

  forkJoin() {
    this.rxjs.hitAPIWithForkJoin().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  catchErrorFun() {
    this.rxjs.handleError().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  hamada() {
    this.rxjs.tapFun().subscribe({
      next: (res) => {

      }
    })
  }



}
