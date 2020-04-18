import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../services/authentication/jwt.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from '../../../services/requests/api.service';

import { DialogUserAccessErrorComponent } from '../dialogs/login-logout/user-access-error.component';

import { UserSystem } from '../../../models/user-system';


@Component({
  selector: 'dev-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private jwtService: JwtService
    , private apiService: ApiService
    , public jwtHelper: JwtHelperService
    , public dialog: MatDialog
  ) { }

  logged: Boolean = false;
  userSystem: UserSystem;

  ngOnInit() {
    this.logged = this.jwtService.loggedIn;
    console.log(this.logged)
    if(this.logged){
      let token = this.jwtService.getJwtToken();
      let decodedToken = this.jwtHelper.decodeToken(token);
      let info = decodedToken.info;
      this.apiService.getUserByEmailOrNickname(info, info).then(
        (res: UserSystem) => {
          this.userSystem = res[0];
          // console.log(this.userSystem)
      }).catch((error) => {
        this.openUserAccessErrorDialog();      
        console.log(error);
      });
    }

  }

  openUserAccessErrorDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    this.dialog.open(DialogUserAccessErrorComponent, dialogConfig);
  }

  logout(){
    this.logged = false;
    this.jwtService.logout();
  }

}
