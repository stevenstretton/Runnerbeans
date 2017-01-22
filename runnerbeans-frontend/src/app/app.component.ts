import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { AuthService } from './services/auth.services';
import { Router } from '@angular/router';
// import { FileUploadModule } from 'ng2-file-upload';

let user = JSON.parse(localStorage.getItem('user'));

//https://www.npmjs.com/package/ng2-cookies
Cookie.set('RunnerbeanCookie', 'cookieValue', 3000);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

  constructor(
    public authService: AuthService,
    public router: Router
  ){
  }

  ngOnInit()
  {
      console.log(this.authService.isLoggedIn.toString());

  }

  submitLogoutRequest()
  {
      localStorage.removeItem('user');
      this.authService.logout();
      this.router.navigate(['/']);
  }

}
