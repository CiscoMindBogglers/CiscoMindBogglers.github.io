import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from 'src/app/webex.service';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit {

  displayName: string;
  intial: string;
  roomsList: any;
  
  constructor(private webex: WebexService, public router: Router) { }
  ngOnInit(): void {
    this.webex.onInit();
    this.webex.listRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      this.roomsList = rooms.items;
    });
    this.webex.fetchMyDetails().then((data) => {
      this.displayName = data.displayName;
      this.intial = this.webex.getUserInitial(this.displayName );
    });
  }
}
