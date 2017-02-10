import { Component, OnInit } from '@angular/core';
import { Sport } from '../models/sport';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8000/wall/upload/';

@Component({
  selector: 'app-root',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public userId: String;
  public userEmail: String;
  public firstName: String;
  public token = '';
  public results: any = [];
  public lat: number = 51.678418;
  public lng: number = 7.809007;
  public uploader:FileUploader = new FileUploader({
    url: URL,
    isHTML5: true,
    authToken: this.token
  });

  constructor(private http:Http) { }

  ngOnInit() {
    //check if token exists here

    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log("localstorage [user] :: " + user);
      this.userId = user._id;
      this.firstName = user.firstname;
      this.userEmail = user.email;
      this.token = user.token;
    }
    this.uploader.onAfterAddingFile = function (file) {
      file.withCredentials = false;
    };
    this.retrieveFitnessResults();
  }

  uploadedFiles: any[] = [];

  sport:Sport =
  {
      activity: '',
      distance: '',
      time: '',
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

    this.http.post('http://localhost:8000/wall', this.sport, options) //correct token is being received!
      .subscribe( ( response : Response ) => {
        this.results.push(this.sport);
      } );

  }

  retrieveFitnessResults()
  {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});

      this.http.get('http://localhost:8000/wall', options)
        .map(res => res.json())
        .subscribe(
          posts => {
            this.results = posts
        });
  }

  retreveGpxData()
  {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});

      this.http.post('http://localhost:8000/wall/gpx', options)
        .map(res => res.json())
        .subscribe();
  }

  deleteFitnessResult(id: string)
  {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});

      this.http.delete('http://localhost:8000/wall/delete/'+id, options)
        .subscribe( ( response : Response) => {
          this.results.pop(this.sport);
        });
      console.log("id=" + id);
  }

  onUpload(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }




}
