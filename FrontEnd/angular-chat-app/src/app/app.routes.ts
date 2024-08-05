import { Routes } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        title: 'Home page',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page'
      }
];
