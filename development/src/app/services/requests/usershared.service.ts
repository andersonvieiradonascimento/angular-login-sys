import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersharedService {

  constructor( private apiService: ApiService ) { }

  private userInfo: any = new BehaviorSubject('some data');
  sharedUserInfo = this.userInfo.asObservable();

}
