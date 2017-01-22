import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public userId: String;
  public userEmail: String;
  public firstName: String;
  public lastname: String;
  public token = '';
  public editMode: boolean;

  constructor(
    public authService: AuthService,
    public http: Http,
    public router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      this.userId = user._id;
      this.firstName = user.firstname;
      this.lastname = user.surname;
      this.userEmail = user.email;
      this.token = user.token;
    }
  }

  user:User =
  {
    firstname: '',
    surname: '',
    email: '',
    password: ''
  };

  changeEmail()
  {
      this.editMode = true;
  }

  submitNewEmail(id: string)
  {
    let headers = new Headers();
    headers.append('Authorization', this.token);
    let options = new RequestOptions({headers: headers});


    this.http.post('http://localhost:8000/account/edit/'+id, this.user, options)
      .subscribe( ( response : Response ) => {

      });
  }

  deleteUserAccount(id: string)
  {
      let headers = new Headers();
      headers.append('Authorization', this.token);
      let options = new RequestOptions({headers: headers});

      this.http.delete('http://localhost:8000/account/delete/'+id, options)
        .subscribe( ( response : Response) => {
          localStorage.removeItem('user');
          this.authService.logout();
          this.router.navigate(['/']);
        });
      console.log("id=" + id);
  }


}
