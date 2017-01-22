import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';

//https://www.npmjs.com/package/ng2-cookies
Cookie.set('RunnerbeanCookie', 'cookieValue', 3000);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app works!';
}
