import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { CanActivate } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService) { }

  async CanActivate(): Promise<Boolean>{
    if(this.auth.authenticateUser){
      return true;
    }else{
      return false;
    }
  }
}
