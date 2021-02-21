import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from 'src/app/webex.service';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { emailService } from '../emailId.service';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit {
  faBullhorn = faBullhorn;
  faPhoneAlt = faPhoneAlt;
  faStickyNote = faStickyNote;
  faCalendar = faCalendar;
  displayName: string;
  firstName: string;
  intial: string;
  roomsList: any;

  constructor(private webex: WebexService, public router: Router,private email:emailService) { }
  ngOnInit(): void {
    this.webex.listenForMemberShipEvents();
    this.webex.subject.subscribe(({ webexEvent, event }) => {
      if (webexEvent == 'memberShipDeleted') {
        console.log("membership Removed")
       console.log(event)
      }

    });
    this.webex.listRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      this.roomsList = rooms.items;
    });
    this.webex.fetchMyDetails().then((data) => {
      this.email.emailId.next(data.emails[0]);
      this.displayName = data.displayName;
      this.intial = this.webex.getUserInitial(this.displayName );
      this.firstName = this.webex.getFirstName(this.displayName );
    });
  }
  logout(){
    this.webex.logout();
  }
  updatespacelist( type ){
    console.log("update space list: " + type) ;
    if (type == "group") {
      this.webex.filterListRoom("group").then((rooms) => {
        console.log("Printing rooms")
        console.log(rooms.items);
        this.roomsList = rooms.items;
      });
    }
    if (type == "direct") {
      this.webex.filterListRoom("direct").then((rooms) => {
        console.log("Printing rooms")
        console.log(rooms.items);
        this.roomsList = rooms.items;
      });
    }
    if (type == "all") {
      this.webex.listRoom().then((rooms) => {
        console.log("Printing rooms")
        console.log(rooms.items);
        this.roomsList = rooms.items;
      });
    }
  }
  search(event){
    var searchValue = event.target.value.toLowerCase();
    var searchedArr = [];
    var searchroomsList = [];
    this.webex.listRoom().then((rooms) => {
      searchroomsList = rooms.items;
      for (var peopleSpace in  searchroomsList){
        console.log(searchroomsList[peopleSpace].title);
        if(searchroomsList[peopleSpace].title.toLowerCase().includes(searchValue)){
          searchedArr.push(searchroomsList[peopleSpace]);
        }
      }
      this.roomsList = searchedArr;
    });
  }
}
