import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SpaceListComponent } from './webex-layout/space-list/space-list.component';
import { WebexLayoutComponent } from './webex-layout/webex-layout.component';
import { SpaceDetailsComponent } from './webex-layout/space-details/space-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BroadcastComponent } from './webex-layout/broadcast/broadcast.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotesComponent } from './webex-layout/notes/notes.component';
import { MeetingComponent } from './webex-layout/meeting/meeting.component';
import { CalendarComponent } from './webex-layout/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SpaceListComponent,
    WebexLayoutComponent,
    SpaceDetailsComponent,
    BroadcastComponent,
    NotesComponent,
    MeetingComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelect2Module,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
