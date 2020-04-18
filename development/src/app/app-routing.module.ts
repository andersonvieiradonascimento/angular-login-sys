import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/UI/sign-up/sign-up.component';
import { SignInComponent } from './components/UI/sign-in/sign-in.component';
import { HomepageComponent } from './components/UI/homepage/homepage.component';
import { ProfileConfigComponent } from './components/UI/user/profile-config/profile-config.component';
import { OverviewComponent } from './components/UI/user/overview/overview.component';

const routes: Routes = [
  {
    path: '', pathMatch:'full', redirectTo:'homepage'
  },
  
  {
    path: 'homepage', component: HomepageComponent,
  },

  {
    path: 'register', component: SignUpComponent
  },

  {
    path: 'login', component: SignInComponent
  },

  {
    path: 'profile', component: ProfileConfigComponent
  },

  {
    path: 'overview', component: OverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
