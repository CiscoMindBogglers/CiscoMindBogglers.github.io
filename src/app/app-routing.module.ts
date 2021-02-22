import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../app/auth/auth.component';
import { HomeComponent } from '../app/home/home.component';
import { BroadcastComponent } from './webex-layout/broadcast/broadcast.component';
import { CalendarComponent } from './webex-layout/calendar/calendar.component';
import { MeetingComponent } from './webex-layout/meeting/meeting.component';
import { NotesComponent } from './webex-layout/notes/notes.component';
import { SinglePartyCallComponent } from './webex-layout/single-party-call/single-party-call.component';
import { SpaceDetailsComponent } from './webex-layout/space-details/space-details.component';
import { StartComponent } from './webex-layout/start/start.component';
import { WebexLayoutComponent } from './webex-layout/webex-layout.component'

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
    path: 'webex',
    component: WebexLayoutComponent,
    children: [{
      path: 'broadcast',
      component: BroadcastComponent,
    }, {
      path: 'notes',
      component: NotesComponent,
    }, {
      path: 'meeting',
      component: MeetingComponent,
    }, {
      path: 'calendar',
      component: CalendarComponent,
    },{
      path: 'call',
      component: SinglePartyCallComponent,
    },{
      path: 'start',
      component: StartComponent,
    }, {
      path: ':name/:type/:id',
      component: SpaceDetailsComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
