import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private static readonly DARK_THEME_CLASS = 'darkMode';
  private static readonly DARK_THEME_LIGHT = 'light';
  private static readonly DARK_THEME_DARK = 'dark';

  public theme: string;
  public light: boolean = false;
  public dark: boolean = true;
  public currentUser: any = null;

  constructor(@Inject(DOCUMENT) private document: Document, public loginDialog: MatDialog, 
    private token: TokenStorageService,private snackBar: MatSnackBar,private router: Router) {
    this.theme = this.document.documentElement.classList.contains(NavbarComponent.DARK_THEME_CLASS) ? NavbarComponent.DARK_THEME_DARK : NavbarComponent.DARK_THEME_LIGHT;
  }

  public selectDarkTheme(): void {
    this.light = true;
    this.dark = false;
    this.document.documentElement.classList.add(NavbarComponent.DARK_THEME_CLASS);
    this.theme = NavbarComponent.DARK_THEME_DARK;
  }

  public selectLightTheme(): void {
    this.light = false;
    this.dark = true;
    this.document.documentElement.classList.remove(NavbarComponent.DARK_THEME_CLASS);
    this.theme = NavbarComponent.DARK_THEME_LIGHT;
  }

  public openLoginDialog(): void {
    const dialog = this.loginDialog.open(LoginComponent, {
      width: '350px',
      restoreFocus: false,
      panelClass: 'dialog-cust',
    });

    dialog.afterClosed().subscribe(() => {
      if (this.token.getUser().username != null) {
        this.snackBar.open('Login Successful', 'Dismiss', {
          duration: 5000,
        });

        this.currentUser = this.token.getUser();
        this.router.navigate(['todo']);
      }
    });
  }

  logOut(): void {
    this.token.signout();
    this.currentUser = null;
    this.router.navigate(['welcome']);
  }
}
