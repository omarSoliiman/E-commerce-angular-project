import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  errorMsg = signal<string>('');
  isLoading = signal<boolean>(false);
  userToken = signal<string>('');


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,
      // Validators.pattern(/^[A-Z][a-z][0-9]{5}$/)
    ])
  })

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true)
      this.auth.loginAPI(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          // store the token in localtorage 
          localStorage.setItem("userToken", res.token)
          // get the token from localStorage 
          this.auth.setUserData();
          this.router.navigate(['/home'])
          console.log(res);
        },
        error: (err) => {
          console.log(err)
          this.errorMsg.set(err.error.message);
          this.isLoading.set(false);
        }
      })
    }

  }

}
