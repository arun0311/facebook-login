import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams,LoginResponse, LoginOptions} from 'ngx-facebook';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Login Page';
  data:any;
  ap: any;
  token:any;
  email:any;
  name:any;
  fname:any;
  lname:any;
  gender:any;
  total_friends:any;
  pages_show_list:any;
  getdeatil:boolean;
  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: 'put your app id here',
      version: 'v2.9'
    };

    fb.init(initParams);

  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getdeatil = false;
  }
   login() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        this.data=res.authResponse.userID
        this.token=res.authResponse.accessToken;

      })
      .catch(this.handleError);
     // this.getLoginStatus();

  }
  private handleError(error) {
    console.error('Error processing action', error);
  }
  getLoginStatus() {
    this.getdeatil = true;
    this.ap='/'+this.data+'/friends'+'/?access_token='+this.token;
    console.log(this.ap)
    this.fb.api(this.ap).then((response)=>{
    console.log(response)
    this.total_friends=response.summary.total_count;
    })
    this.fb.api('/me?fields=gender,first_name,last_name,email')
      .then((res: any) => {
        console.log('Got the users profile', res);
        this.gender=res.gender;
        this.email = res.email;
        this.fname = res.first_name;
        this.lname = res.last_name;
        this.name = this. fname + this.lname;
        this.pages_show_list = res.pages_show_list;
      })
      .catch(this.handleError);
    this.fb.api('/me')
      .then((res: any) => {
        // console.log('Got the users profile', res);
        this.gender=res.gender;
        this.email = res.email;
        this.fname = res.first_name;
        this.lname = res.last_name;
      })
      .catch(this.handleError);
  }
  logout(){
  this.fb.logout().then((res) => console.log(res
  ));
  }

}
