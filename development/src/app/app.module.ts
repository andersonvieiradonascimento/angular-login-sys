import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { MaterialModule } from './components/style-behavior/material.module';
//import { BootstrapModule } from './style-behavior/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpComponent } from './components/UI/sign-up/sign-up.component';
import { SignInComponent } from './components/UI/sign-in/sign-in.component';
import { HomepageComponent } from './components/UI/homepage/homepage.component';

// Dialogs
import { DialogUserRegisteredComponent } from './components/UI/dialogs/login-logout/user-registered.component';
import { DialogUserAccessErrorComponent } from './components/UI/dialogs/login-logout/user-access-error.component';
import { DialogUserInfoExistsComponent } from './components/UI/dialogs/login-logout/user-info-exists.component';
import { DialogUserLoginSuccessComponent } from './components/UI/dialogs/login-logout/user-login-success.component';
import { AccountDeletedComponent } from './components/UI/dialogs/response-actions/account-deleted.component';

import { UsefulStrings } from '../assets/strings';
import { OverviewComponent } from './components/UI/user/overview/overview.component';
import { ProfileConfigComponent } from './components/UI/user/profile-config/profile-config.component';
import { CanvasComponent } from './components/UI/user/playarea/canvas/canvas.component';
import { StatisticsComponent } from './components/UI/user/playarea/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomepageComponent,
    DialogUserRegisteredComponent,
    DialogUserAccessErrorComponent,
    DialogUserInfoExistsComponent,
    DialogUserLoginSuccessComponent,
    AccountDeletedComponent,
    OverviewComponent,
    ProfileConfigComponent,
    CanvasComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    //BootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter(){
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: [UsefulStrings.API_URL],
        blacklistedRoutes: [`${UsefulStrings.API_URL}auth/login`]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogUserRegisteredComponent
    , DialogUserAccessErrorComponent
    , DialogUserInfoExistsComponent
    , DialogUserLoginSuccessComponent
    , AccountDeletedComponent
  ]
})
export class AppModule { }
