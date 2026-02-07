import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss'
})
export class ForgetPassword {

  private authService: Auth = inject(Auth);
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);


  isLoading = signal<boolean>(false);


  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  emailSubmit() {
    if (this.emailForm.valid) {
      const mail = this.emailForm.value.email;
      this.isLoading.set(true);
      this.authService.forgetPassword(mail).subscribe({
        next: (res) => {
          console.log(res); 
          this.isLoading.set(false);
          this.toastrService.success(res.message);
          this.router.navigate(['/verify-code'])

        },
        error: (err) => {
          this.isLoading.set(false);
          console.log(err);
        }
      })
    }

  }

}
