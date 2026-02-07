import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.html',
  styleUrl: './verify-reset-code.scss'
})
export class VerifyResetCode {

  private authService: Auth = inject(Auth);
  private routerService: Router = inject(Router);


  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.maxLength(6)])
  })


  submitCode() {
    const code = this.resetCodeForm.value.resetCode;
    this.authService.verifyResetCode(code).subscribe({
      next: (res) => {
        console.log(res);
        this.routerService.navigate(['/reset-password'])

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
