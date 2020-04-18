import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../../../services/requests/api.service';
import { JwtService } from '../../../services/authentication/jwt.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

//Dialogs
import { DialogUserRegisteredComponent } from '../dialogs/login-logout/user-registered.component';
import { DialogUserAccessErrorComponent } from '../dialogs/login-logout/user-access-error.component';
import { DialogUserInfoExistsComponent } from '../dialogs/login-logout/user-info-exists.component';

import { UsefulStrings } from '../../../../assets/strings'

export class errorDetector implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidEmail = !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    const invalidCtr = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidEmail || invalidCtr || invalidParent);
  }
}

@Component({
  selector: 'dev-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  // Form utilities variables
  showDetails: Boolean = false;
  strength: String = "weak";

  // Request variables
  emailChecker: Boolean = false;
  nicknameChecker: Boolean = false;

  // Form groups
  user: FormGroup;
  passwords: FormGroup;

  // Form Controls
  name = new FormControl('', [Validators.required]);
  nickname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordVerifier = new FormControl('');

  matcher = new errorDetector();

  constructor(
    fb: FormBuilder
    , private apiService: ApiService
    , private jwtService: JwtService
    , public router: Router
    , public dialog: MatDialog) {

    this.user = fb.group({
      "name": this.name,
      "nickname": this.nickname,
      "email":this.email
    });

    this.passwords = fb.group({
      "password": this.password,
      "passwordVerifier": this.passwordVerifier
    }, {validator: this.comparePass});

  }

  ngOnInit() {
    if(this.jwtService.loggedIn){
      this.router.navigate(['homepage']);
    }
  }

  // Registering
  checkAndRegister(nickname, email){

    let name = this.user.controls.name.value;
    let nickreal = this.user.controls.nickname.value.trim();
    let password = this.passwords.controls.password.value.trim();
      
    var user = {
      "name": name,
      "nickname": nickname,
      "nickreal": nickreal,
      "email": email,
      "password": password
    }
    this.sendUserInfo(user);

  }

  checkEmailAndNickname(){
    
    let nickname = this.user.controls.nickname.value.toLowerCase().trim();
    let email = this.user.controls.email.value.toLowerCase().trim();

    this.apiService.getUserByEmailOrNickname(email, nickname).then(
      (res: any[]) => {
        if(res.length > 0){
          
          res.forEach((element) => {
            // console.log(element)
            if(element.email === email){
              this.emailChecker = true;
            }
            if(element.nickname === nickname){
              this.nicknameChecker = true;
            }
          })
          
          if(this.emailChecker){
            this.openUserInfoExistsDialog('email');
            this.emailChecker = false;
          }else if(this.nicknameChecker){
            this.openUserInfoExistsDialog('nickname')
            this.nicknameChecker = false;
          }

        }else{
          this.checkAndRegister(nickname, email);
        }
        
    }).catch((error) => {
      this.openUserAccessErrorDialog();
      console.error(error);
    });
    
  }

  sendUserInfo(user){
    this.apiService.createUser(user).then(
      (res: any)=>{
        this.openUserRegisteredDialog(true);
        this.jwtService.login(user['email'], user['password']);
      },
      err => {
        this.openUserAccessErrorDialog();
        console.log(err);
      }
    );
  }

  // Validation
  // Password
  comparePass(group: FormGroup){
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordVerifier.value;

    return pass === confirmPass ? null : {notSame: true}
  }

  onStrengthChanged(strength: number){
    if(strength > 80){
      this.strength = "strong";
    }else{
      if(strength > 40){
        this.strength = "medium";
      }else{
        if(strength >= 0){
          this.strength = "weak";
        }
      }
    }
  }

  toggleDetails(){
    this.showDetails = !this.showDetails;
  }

  // Dialogs
  openUserRegisteredDialog(error: Boolean){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = error;
    this.dialog.open(DialogUserRegisteredComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(value => {
    //   console.log(`Dialog sent: ${value}`);
    // });
  }

  openUserAccessErrorDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    this.dialog.open(DialogUserAccessErrorComponent, dialogConfig);
  }

  openUserInfoExistsDialog(type){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = type;
    this.dialog.open(DialogUserInfoExistsComponent, dialogConfig);
  }

}
