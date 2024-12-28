import { Component } from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ROUTESCONSTANT} from '../../../constants/route-constants';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
MatLabel,
    MatIcon,
    ReactiveFormsModule,
    MatToolbar,
    MatIconButton,
    MatCard,
    MatFormField,
    MatInput,
    MatButton,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  private router: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.router.navigate([ROUTESCONSTANT.DASHBOARD]);
      // Add authentication logic here
    }
  }
}
