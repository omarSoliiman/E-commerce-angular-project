import { Component, inject, signal } from '@angular/core';
import { Rxjs } from '../../../core/services/rxjs-test/rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  private rxjs: Rxjs = inject(Rxjs)
  allBrands = signal<any[]>([])

  ngOnInit(): void {
    this.rxjs.getModifyingCat().subscribe({
      next: (res) => {
        console.log(res);
        this.allBrands.set(res);
      },
      error: (err) => { console.log(err) }
    })
  }


}
