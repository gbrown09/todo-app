import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { TodoComponent } from './features/todo/pages/todo.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
