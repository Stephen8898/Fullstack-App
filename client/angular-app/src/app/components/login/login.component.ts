import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  email: String = '';
  password: String = '';

  constructor(private auth: AuthService, private validate: ValidateService) { }

  ngOnInit() {

  }

  loginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
  
    if(!this.validate.validateLogin(user)){
      console.log("please fill out all fields");
    }else{
      this.auth.authenticateUser(user);
    }

    console.log('submit pressed');
  }

}