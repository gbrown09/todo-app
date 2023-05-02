import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './features/todo/components/add-dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './features/todo/components/confirm-dialog/confirm-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoComponent } from './features/todo/pages/todo.component';
import { TodoService } from './features/todo/services/todo.service';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { MatMenuModule } from '@angular/material/menu';
import { authInterceptorProviders } from './interceptors/auth_interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    DialogComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    TodoComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [TodoService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
