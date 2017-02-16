import { Component, OnInit } from '@angular/core';
import { Sport } from '../models/sport';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public name: String;
  public email: String;
  public id: String;

  public firstName: String;
  public token = '';
  public results: any = [];

  public filterUser: Boolean;
  public filterState: String;

  constructor(
    private http:Http,
    public router: Router
  ) { }

  ngOnInit() {
    //check if token exists here

    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log("localstorage [user] :: " + user);
      this.name = user._id;
      this.firstName = user.firstname;
      this.email = user.email;
      this.token = user.token;

      this.filerUsers();

    }
    this.retrieveFitnessResults();
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
            console.log(this.results[0].waypoints[0]);
          });
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

        });
  }

  filerUsers()
  {
      this.filterUser = !this.filterUser;

      if (this.filterUser) {
          this.filterState = "Show Everyone "
      } else {
          this.filterState = "Just show " + this.firstName;
      }
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
