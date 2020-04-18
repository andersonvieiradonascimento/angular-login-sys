import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ApiService } from '../../../../services/requests/api.service';
import { JwtService } from '../../../../services/authentication/jwt.service';
import { UsersharedService } from '../../../../services/requests/usershared.service';

import { AccountDeletedComponent } from '../../dialogs/response-actions/account-deleted.component';

@Component({
  selector: 'dev-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.css']
})

export class ProfileConfigComponent implements OnInit {


  constructor( 
    private sharedService: UsersharedService 
    , private apiService: ApiService
    , private jwtService: JwtService
    , public dialog: MatDialog
    , public router: Router
  ) { }

  @Input() userSystem: any;

  ngOnInit(): void {
  }

  delete(){
    let id = this.userSystem.id;
    console.log("deleting user with id", id)
    this.apiService.deleteUserById(id).then((res)=>{
      this.openAccountDeletedDialog();
      this.jwtService.logout();
      this.router.navigate(['login']);
      console.log(res);
    }).catch((error) => {
      console.log(error)
    })
  }

  openAccountDeletedDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data"
    this.dialog.open(AccountDeletedComponent, dialogConfig);
  }

}
