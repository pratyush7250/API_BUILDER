import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// NG-ZORRO Standalone Imports
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule
  ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth implements OnInit {
  authForm!: FormGroup;
  isLogin = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      this.authForm.addControl('name', this.fb.control('', [Validators.required, Validators.minLength(2)]));
    } else {
      this.authForm.removeControl('name');
    }
    this.authForm.reset({ remember: true });
  }

  submitForm(): void {
    if (this.authForm.valid) {
      this.isLoading = true;
      const mode = this.isLogin ? 'Login' : 'Signup';

      const userName = this.authForm.value.name || this.authForm.value.email;

      console.log(`${mode} Initiated:`, this.authForm.value);

      setTimeout(() => {
        this.isLoading = false;

        this.notification.success(
          `${mode} Successful`,
          `Welcome, ${userName}!`,
          { nzPlacement: 'topRight' }
        );

        this.authForm.reset({ remember: true });
        this.goToDashboard()

      }, 3000);

    } else {
      Object.values(this.authForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}