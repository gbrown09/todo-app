import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required,Validators.minLength(3)]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginComponent>,
    private tokenStorage: TokenStorageService) {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
    this.initForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  private initForm() {}

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onSubmit(): void {
    this.authService
      .login(this.username?.value!, this.password?.value!)
      .subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.dialogRef.close();
        },
        error: (err) => {
          this.errorMessage = err.error.errorMessage;
          this.isLoginFailed = true;
        },
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
