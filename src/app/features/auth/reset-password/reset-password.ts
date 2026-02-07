import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';


@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword {

  private authService: Auth = inject(Auth);



  resetPass: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    newPassword: new FormControl(null)
  })

  resetPassword() {
    const email = this.resetPass.value.email;
    const newPass = this.resetPass.value.newPassword;

    this.authService.resetPassword(email , newPass).subscribe({
      next : (res)=>{console.log(res)},
      error : (err)=>{console.log(err)},
    })
  }
}
