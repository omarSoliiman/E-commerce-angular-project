import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Auth } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  isFormValid: boolean = false;
  isLoading = signal<boolean>(false); // signal variable 
  errorMsg = signal<string>('');

  // constructor(private auth : Auth){}

  private auth: Auth = inject(Auth); // inject service by inject method
  private router: Router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{5}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{5}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[1205][0-9]{8}$/)]),
  }, this.confirmPassword)

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true)
      this.auth.registerAPI(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.router.navigate(['/login'])
            this.isLoading.set(false)
          }

        },

        error: (err) => {
          console.log(err.error.message);
          this.errorMsg.set(err.error.message);
          this.isLoading.set(false);
        }
        
      })
    }
  }

  confirmPassword(myForm: AbstractControl) {
    if (myForm.get('password')?.value === myForm.get('rePassword')?.value) {
      return null;
    } else {
      return { notmatched: true }
    }
  }





}
