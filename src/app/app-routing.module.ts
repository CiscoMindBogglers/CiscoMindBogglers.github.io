import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaceDetailsComponent } from './webex-layout/space-details/space-details.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: SpaceDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
