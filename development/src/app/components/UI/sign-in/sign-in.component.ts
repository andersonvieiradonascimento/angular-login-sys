import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';

import { ApiService } from '../../../services/requests/api.service';
import { JwtService } from '../../../services/authentication/jwt.service';
import { Userauth } from '../../../models/userauth';

import { DialogUserAccessErrorComponent } from '../dialogs/login-logout/user-access-error.component';
import { DialogUserRegisteredComponent } from '../dialogs/login-logout/user-registered.component';
import { DialogUserLoginSuccessComponent } from '../dialogs/login-logout/user-login-success.component'


import * as sha512 from 'js-sha512';

export class DetectorDeErros implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidEmail = !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    const invalidCtr = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidEmail || invalidCtr || invalidParent);
  }
}

@Component({
  selector: 'dev-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // Validation variables
  equalHash: Boolean = false;

  // Form Group
  form: FormGroup;

  // Form Controls
  userinfo = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required])
  matcher = new DetectorDeErros();

  constructor(
    fb: FormBuilder
    , private apiService: ApiService
    , private jwtService: JwtService
    , public router: Router
    , public dialog: MatDialog
  ) {
    this.form = fb.group({
      "userinfo": this.userinfo,
      "password": this.password
    });
  }

  ngOnInit() {
    if(this.jwtService.loggedIn){
      this.router.navigate(['homepage']);
    }
  }

  // Hash validation
  checkInfoProvided(){
    let info = this.form.controls.userinfo.value.toLowerCase().trim();
    
    this.apiService.getUserByEmailOrNickname(info, info).then(
      (res: any[]) => {
        if(res.length > 0){
          console.log(res.length)
          this.checkAndEnter(res[0]);
        }else{
          this.openUserRegisteredDialog(false);
        }
    }).catch((error) => {
      this.openUserAccessErrorDialog();
      console.log(error)
    });

  }

  checkAndEnter( user: Userauth ){
    let hash = user.hash;
    let secret = user.secret;
    let pass = this.form.controls.password.value;
    let hash2 = sha512.sha512.hmac.create(secret);
    hash2.update(pass);

    //console.log(hash2.hex())
    console.log(hash)
    if(hash2.hex() === hash){
      this.openUserLoginSucessDialog();
      this.jwtService.login(user.email, pass);
    }else{
      this.openUserRegisteredDialog(false);
      //console.log(hash)
    }
  }

  // Dialogs
  openUserAccessErrorDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    this.dialog.open(DialogUserAccessErrorComponent, dialogConfig);
  }

  openUserRegisteredDialog(error: Boolean){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = error;
    this.dialog.open(DialogUserRegisteredComponent, dialogConfig);
  }

  openUserLoginSucessDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    this.dialog.open(DialogUserLoginSuccessComponent, dialogConfig);
  }

}
