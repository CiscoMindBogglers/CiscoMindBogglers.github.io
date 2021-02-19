import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpaceListComponent } from './webex-layout/space-list/space-list.component';
import { WebexLayoutComponent } from './webex-layout/webex-layout.component';
import { SpaceDetailsComponent } from './webex-layout/space-details/space-details.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaceListComponent,
    WebexLayoutComponent,
    SpaceDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
