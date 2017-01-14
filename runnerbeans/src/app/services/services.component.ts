import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { User } from '../models/user';

//This is where all the CRUD action happens
@Injectable()
export class Services {
    constructor(private http: Http)
    { }

    addUser(user: User)
    {
        return this.http.post('/account/new', user, this.jwt()).map((response: Response) => response.json());
    }

    //TODO: edit and delete features will need to be added in here


    private jwt()
    {
        //authorisation header token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser && currentUser.token)
        {
            let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
            return new RequestOptions({ headers: headers});
        }
    }

}

// @Component({
//   selector: 'app-services',
//   templateUrl: './services.component.html',
//   styleUrls: ['./services.component.css']
// })
// export class ServicesComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
