import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WebexTeamsComponent } from './webex-teams/webex-teams.component';
import { AuthComponent } from './auth/auth.component';
import { SpaceListComponent } from './webex-layout/space-list/space-list.component';
import { WebexLayoutComponent } from './webex-layout/webex-layout.component';
import { SpaceDetailsComponent } from './webex-layout/space-details/space-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebexTeamsComponent,
    AuthComponent,
    SpaceListComponent,
    WebexLayoutComponent,
    SpaceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
