import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Login} from "../models/login";
import {AuthenticationService} from '../services/authentication.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = "";

  constructor(
    private http : Http,
    private authenticationService : AuthenticationService
  ) { };
  loginCredentials:Login =
  {
      email: '',
      password: ''
  };

  ngOnInit() {
    // this.http.get('http://localhost:8000/login')
    //   .subscribe( ( response : Response ) => {
    //       console.log( response.json() );
    //   } );
    // this.authenticationService.logout();
  }

  submitLoginRequest() {
    this.http.post('http://localhost:8000/login', this.loginCredentials)
      .subscribe( ( response : Response ) => {
        //console.log( response.json() );
      });



  }

}
