import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private http : Http ) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/')
      .subscribe( ( response : Response ) => {
        console.log( response.json() );
      } );
  }

}
