/**
 * Created by stevenstretton on 20/12/2016.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/authguard.services';

//add all views here
// import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WallComponent } from './wall/wall.component';
import { AccountComponent } from './account/account.component';

export const router: Routes = [
  //all the routes are shown here, this directs the path to each of the component
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'wall', component: WallComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
