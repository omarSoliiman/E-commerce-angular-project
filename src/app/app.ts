import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbit/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Navbar } from "./layout/navbar/navbar";
import { Footer } from "./layout/footer/footer";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ChangeColor } from "./shared/directives/change-color";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

  }
}
