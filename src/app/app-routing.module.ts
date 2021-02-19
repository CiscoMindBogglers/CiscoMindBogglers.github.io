import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../app/auth/auth.component';
import { HomeComponent } from '../app/home/home.component';
import { WebexTeamsComponent } from '../app/webex-teams/webex-teams.component';
import { SpaceDetailsComponent } from './webex-layout/space-details/space-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'rooms',
    component: SpaceDetailsComponent,
  },
  {
    path: 'webex-teams',
    component: WebexTeamsComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
