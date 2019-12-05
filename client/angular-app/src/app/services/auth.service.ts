import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDef } from './common'
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'    
})
export class AuthService {

   authToken: Object;
   user: any;

   constructor(private http: HttpClient, private router: Router){

   }



registerUser(user): void{
    let header = new HttpHeaders({'Content-type': 'application/json'});
    this.http.post(`${ShareDef.BACKEND_URL}api/users/register`, user, {headers : header}).subscribe(
        data =>  {
            console.log(data)
        },
        error => {
            console.log(error)
        }
    )};



async authenticateUser(user): Promise<Boolean>{
    let header = new HttpHeaders({'Content-type': 'application/json'});
    let res = this.http.post(`${ShareDef.BACKEND_URL}api/users/authenticate`, user, {headers: header}).toPromise()
    // .then(res =>{
    //     let status = res["success"];
    //     if(status){
    //         return true;
    //     }else{
    //         return false;
    //     }
    //     console.log(res['token']);
    //   console.log(res['success']);
    let status = res["success"];
    if(status){
        console.log(res['token']);
        return true;
    }else{
        return false;
        }
}


setProfile(): void{

}
 
}