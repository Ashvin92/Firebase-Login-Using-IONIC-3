import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { AngularFireAuth } from "angularfire2/auth";
import { User } from '../../modal/user'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as User;

  constructor(public navCtrl: NavController,private autH: AngularFireAuth) {

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 async login(user:User)
  {
    try
    {
  const result = await  this.autH.auth.signInWithEmailAndPassword(user.email,user.password)
  if(result)
  {
  console.log("logged in");
  

  }
  }
  catch(e)
  {
   user.email = "";
   user.password="";
    console.log(e);
  }
}

}
