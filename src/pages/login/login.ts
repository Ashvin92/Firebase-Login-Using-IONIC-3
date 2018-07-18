import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { User } from '../../modal/user'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loadingLogin : any;

  constructor(private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private autH: AngularFireAuth,private loadingCtrl : LoadingController) {
  
    this.loadingLogin = this.loadingCtrl.create({
      content: 'Authenticating...'
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User logged in successfully',
      duration: 3000,
      position: 'center'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

 async login(user:User)
  {
    this.loadingLogin.present();
    try
    {
  const result = await  this.autH.auth.signInWithEmailAndPassword(user.email,user.password)
  if(result)
  {
    this.loadingLogin.dismiss();
    this.presentToast();
   
    console.log("logged in");
  

  }
  }
  catch(e)
  {
    this.loadingLogin.dismiss();
   user.email = "";
   user.password="";
    console.log(e);
  }
}

}
