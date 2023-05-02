import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/shared/components/register/register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(private registerDialog: MatDialog) {}

  signUp(): void {
    const dialog = this.registerDialog.open(RegisterComponent, {
      width: '350px',
      restoreFocus: false,
      panelClass: 'dialog-cust',
    });
  }
}
