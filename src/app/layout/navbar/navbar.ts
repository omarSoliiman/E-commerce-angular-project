import { Component, effect, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbit/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  isLogin: boolean = false;

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.checkLogin()
  }


  checkLogin() {
    this.auth.userData.subscribe({
      next: (res) => {
        // user didn't login
        if (this.auth.userData.getValue() == null) {
          this.isLogin = false
        } else {
          // User make login
          this.isLogin = true;
        }
      }
    })

    //I can use effect func if userData ==> signl 
    // effect(()=>{
    //   this.auth.userData
    // })
  }

  logOutSubmit() {
    localStorage.removeItem('userToken');
    this.auth.userData.next(null);
    this.router.navigate(['/login']);
  }

}
