import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {Http, Response} from "@angular/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error = "";

  ngOnInit() {
    this.http.get('http://localhost:8000/register')
      .subscribe( ( response : Response ) => {
        console.log( response.json() );
      } );
  }
  constructor(
    private http : Http,
    private router : Router
  ){};
  user:User =
  {
    firstname: '',
    surname: '',
    email: '',
    password: ''
  };

  submitNewUser() : void {

    this.http.post('http://localhost:8000/register', this.user)
      .subscribe( ( response : Response ) => {
          this.router.navigate(['/login']);
      } );

    //sends to backend server

  };
}
