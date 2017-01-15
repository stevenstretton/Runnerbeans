import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Services } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { WallComponent } from './wall/wall.component';
import { AuthenticationService } from './services/authentication.services';


@NgModule({
  declarations: [
    //pages would be added here
    AppComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    WallComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    routes
  ],
  providers: [
    Services,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
