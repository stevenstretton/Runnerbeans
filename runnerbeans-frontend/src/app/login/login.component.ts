import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = "";

  constructor(
    private http : Http,
    public router : Router,
    public authService: AuthService
  ) {};

  loginCredentials:Login =
  {
      email: '',
      password: ''
  };

  ngOnInit() {

  }

  submitLoginRequest() {
    let headers = new Headers();
    let authorizationHeader = 'Basic ' + btoa(this.loginCredentials.email 
        + ':' + this.loginCredentials.password);
    
    headers.append('Authorization', authorizationHeader);
    let options = new RequestOptions({headers: headers});

    this.http.post('http://localhost:8000/login', this.loginCredentials, options)
      .subscribe( ( response : Response ) => {
        console.log(response.json());
        localStorage.setItem('user', JSON.stringify(response.json().user));
        this.authService.login().subscribe(() => {
          if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/wall';
            // Redirect the user
            this.router.navigate([redirect]);
          }
        });
      });
  }

}
