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

    public userId:String;
    public userEmail:String;
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
        this.userId = user._id;
        this.firstName = user.firstname;
        this.userEmail = user.email;
        this.token = user.token;
      }
    }

    sport:Sport =
    {
      activity: '',
      distance: '',
      time: '',
      wow: '',
      userEmail: '',
      userId: ''
    };

    sendFitnessResult()
    {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});

      this.sport.userId = this.userId;
      this.sport.userEmail = this.userEmail;

      this.http.post('http://localhost:8000/sport', this.sport, options) //correct token is being received!
        .subscribe((response:Response) => {
          this.router.navigate(['/wall']);
        });

    }



}
