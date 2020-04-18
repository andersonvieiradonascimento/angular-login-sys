import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UsefulStrings } from '../../../assets/strings';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor( 
    private httpClient: HttpClient 
    , public router: Router
  ) { }
  apiURL: string = UsefulStrings.API_URL;

  login(userinfo: string, password: string){
    return this.httpClient
      .post<{access_token: string}>(`${this.apiURL}auth/login`, {userinfo, password})
      .toPromise().then(res => {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['homepage']);
      }).catch((error) => {
        console.log(error);
      });
  }

  logout(){
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  getJwtToken(){
    return localStorage.getItem('access_token');
  }

}
