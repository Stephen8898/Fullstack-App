import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    name: String = '';
    username: String = '';
    email: String = '';
    password: String = '';

  constructor(private validate: ValidateService, private auth: AuthService) { }

  ngOnInit() {
    
  }

  registerSubmit(){
    const user = {
      name : this.name,
      username : this.username,
      email: this.name,
      password: this.password
    }
    console.log(!this.validate.validateRegistartion(user))
    if(!this.validate.validateRegistartion(user)){
      console.log('fill out all fields');
      return false;
      }else{
        this.auth.registerUser(user);
      }

    if(this.validate.validateEmail(user.email)){
      console.log('validate email');
      return false;
      }
    }



  }


 
   

