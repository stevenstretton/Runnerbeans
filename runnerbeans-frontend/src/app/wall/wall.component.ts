import { Component, OnInit } from '@angular/core';
import { Sport } from '../models/sport';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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
    this.retrieveFitnessResults();
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

  addWow(id: string)
  {
    let headers = new Headers();
    headers.append('Authorization', this.token);
    let options = new RequestOptions({headers: headers});

    this.http.post('http://localhost:8000/wall/wow/'+id, this.sport, options)
      .subscribe( ( response : Response ) => {
          this.results.update(this.sport);
      });
  }

  showUser()
  {
    let headers = new Headers();
    headers.append('Authorization', this.token);
    let options = new RequestOptions({headers: headers});

    this.http.get('http://localhost:8000/wall/users', options)
      .map(res => res.json())
      .subscribe(
        posts => {
          this.results = posts
        });
  }
}
