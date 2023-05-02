import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required,Validators.minLength(3)]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  });
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private snackBar: MatSnackBar
  ) {}

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    this.authService
      .register(this.username?.value!, this.password?.value!)
      .subscribe({
        next: (data) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.closeDialog();
          this.snackBar.open('Sign Up Successful, please Login to continue','Dismiss',
            {
              duration: 5000,
            }
          );
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
