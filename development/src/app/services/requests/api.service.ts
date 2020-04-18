import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { UsefulStrings } from '../../../assets/strings';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiURL: string = UsefulStrings.API_URL;
  constructor( private httpClient: HttpClient ) { }

  // Create
  public createUser( user: User ){
    return this.httpClient.post(`${this.apiURL}users/`, user).toPromise();
  }

  // Read
  public getUserByEmailOrNickname(email: string, nickname: string){
    return this.httpClient.get(encodeURI(`${this.apiURL}users/${email+' '+nickname}`)).toPromise();
  }

  // Delete
  public deleteUserById(id: number){
    return this.httpClient.delete(`${this.apiURL}users/${id}`).toPromise();
  }

}

