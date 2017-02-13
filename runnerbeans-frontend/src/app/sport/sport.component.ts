import { Component, OnInit } from '@angular/core';
import { Sport } from '../models/sport';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from "@angular/router";
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8000/wall/upload/';

@Component({
  selector: 'app-root',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})

export class SportComponent implements OnInit {

    public id:String;
    public email:String;
    public name:String;
    public firstName:String;
    public token = '';
    // public uploader:FileUploader = new FileUploader({
    //   url: URL,
    //   isHTML5: true,
    //   authToken: this.token
    // });

    constructor(
        private http:Http,
        public router : Router
    ) {
    }

    ngOnInit() {
      if (localStorage.getItem("user") != null) {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("localstorage [user] :: " + user);
        this.id = user._id;
        this.name = user.firstname + ' ' + user.surname;
        this.email = user.email;
        this.token = user.token;
      }
    }

    sport:Sport =
    {
      activity: '',
      distance: '',
      time: '',
      wow: 0,
      user: {
        name: '',
        email: '',
        id: ''
      }
    };

    sendFitnessResult()
    {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});

      this.sport.user.id = this.id;
      this.sport.user.name = this.name;
      this.sport.user.email = this.email;

      this.http.post('http://localhost:8000/sport', this.sport, options) //correct token is being received!
        .subscribe((response:Response) => {
          this.router.navigate(['/wall']);
        });

    }



}
