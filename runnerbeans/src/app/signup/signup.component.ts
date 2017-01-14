import { Component } from '@angular/core';
import { User } from '../models/user';

// var mongodb = require('mongodb');
// var MongoClient  = mongodb.MongoClient;
// var url = 'mongodb://localhost:27017/runnerbeans';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  user:User =
  {
    name: '',
    email: '',
    password: ''
  };

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    //enter mongo commands!
    console.log(value.email, valid);
  //  sendToMongo(value.name, value.email, value.password);
  };

}
//
// function sendToMongo(name, email, password)
// {
//     MongoClient.connect(url, function (err, db)
//     {
//         if (err) {
//             console.log("Cannot connect to mongodb :( \n", err);
//         } else {
//             console.log("Connected to mongodb :D \n", err);
//
//             var collection = db.collection('newAccount');
//
//             var userDetail =
//             {
//                 name: name,
//                 email: email,
//                 password: password
//             };
//
//             collection.insert([userDetail], function (err, result) {
//                 if (err){
//                     console.log("Couldn't send data :( \n", err);
//                 } else {
//                     console.log("Success! :D");
//                 }
//             });
//         }
//     });
// }

