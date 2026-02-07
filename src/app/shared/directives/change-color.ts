import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColor implements AfterViewInit {

  constructor(private el: ElementRef) { }

  @Input() userColor = 'teal'


  ngAfterViewInit(): void {
    this.el.nativeElement.style.backgroundColor = this.userColor;
    this.el.nativeElement.style.color = "white";
  }



}
