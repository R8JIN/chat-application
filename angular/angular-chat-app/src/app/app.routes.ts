import { Routes } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HomeComponent } from './shared/components/home/home.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        title: 'Home page',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Chat Page'
      },
      {
        path: 'sign-up',
        component: SignupComponent,
        title: "SignUp Page"
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile page'
      }
];
