import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from 'src/app/webex.service';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { emailService } from '../emailId.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormArray, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit,OnDestroy {
  faBullhorn = faBullhorn;
  faPhoneAlt = faPhoneAlt;
  faStickyNote = faStickyNote;
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  faCommentAlt = faCommentAlt;
  displayName: string;
  firstName: string;
  lastName: string;
  intial: string;
  roomsList: any;

  all: boolean;
  group: boolean;
  direct: boolean;
  modalOptions:NgbModalOptions;
  closeResult: string;
  membershipSubs: Subscription;
  addSpaceForm: FormGroup;
  personMail:any;
  message:any;


  constructor(private webex: WebexService, public router: Router, private modalService: NgbModal,private email:emailService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      windowClass: 'fade in'
    }
  }

  ngOnInit(): void {
    this. all = true;
    this.webex.listRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      this.roomsList = rooms.items;
    });
    this.webex.listenForMemberShipEvents();
   this.membershipSubs= this.webex.MemberShipsubject.subscribe(({ webexEvent, event }) => {
      console.log(webexEvent)
      if (webexEvent == 'memberShipDeleted') {
        console.log("membership Removed")
       console.log(event)
       this.roomsList=[]
       this.webex.listRoom().then((rooms) => {
         console.log("Printing rooms")
         console.log(rooms.items);
         this.roomsList = rooms.items;
       })
      }

    });
    this.webex.fetchMyDetails().then((data) => {
      this.email.emailId.next(data.emails[0]);
      this.displayName = data.displayName;
      this.intial = this.webex.getUserInitial(this.displayName );
      this.firstName = this.webex.getFirstName(this.displayName );
      this.lastName = this.webex.getLastName(this.displayName );
    });
  }
  logout(){
    this.webex.logout();
  }
  updatespacelist( type ){
    console.log("update space list: " + type) ;
    if (type == "group") {
      this.group = true;
      this. all = false;
      this.direct = false;
      this.webex.filterListRoom("group").then((rooms) => {
        console.log("Printing rooms")
        console.log(rooms.items);
        this.roomsList = rooms.items;
      });
    }
    if (type == "direct") {
      this.group = false;
      this. all = false;
      this.direct = true;
      this.webex.filterListRoom("direct").then((rooms) => {
        console.log("Printing rooms")
        console.log(rooms.items);
        this.roomsList = rooms.items;
      });
    }
    if (type == "all") {
      this.group = false;
      this. all = true;
      this.direct = false;
      this.webex.listRoom().then((rooms) => {
        console.log("Printing rooms")
        console.log(rooms.items);
        this.roomsList = rooms.items;
      });
    }
  }

  get controls() {
    return (this.addSpaceForm.get('memberMailID') as FormArray).controls;
  }
  onAddMember() {
    const control = new FormControl(null);
    (this.addSpaceForm.get('memberMailID') as FormArray).push(control);
  }
  onDeleteMember(index: number) {
    (this.addSpaceForm.get('memberMailID') as FormArray).removeAt(index);
  }

  onSubmitSpace(){
      var value = (<HTMLInputElement>document.getElementById("spaceName")).value;
        this.webex.createRoom(value).then((room) => {
          if(room){
            if(this.addSpaceForm.value.memberMailID[0 ]=== null){
              this.modalService.dismissAll();
              this.updatespacelist('all');
            }
            this.addSpaceForm.value.memberMailID.forEach((element) => {
              if (element != null) {
                this.modalService.dismissAll()
                this.webex.addPeople(element, room.id).then((participants) => {
                  this.modalService.dismissAll();
                  this.updatespacelist('all');
                })
                .catch((error) => {
                  alert("Participant has not been successfully added. Please contact administrator");
                  console.error(error);
                });
              }
            });
          }       
        })
        .catch((error) => {
          alert("Space not successfully created. Please contact administrator");
          console.error(error);
        });

  }
  openModal(content) {
    this.addSpaceForm = new FormGroup({
      memberMailID: new FormArray([]),
    });
    this.onAddMember();
    this.modalService.open(content, this.modalOptions).result.then(
      result => {
      },
      reason => {
      }
    );
  }

  createOneToOneChat(){
    var req={
      toPersonEmail: this.personMail,
      text: this.message
    }
      this.webex.sendOneToOneMessage(req).then((messageDetail) => {
        console.log(messageDetail);
        this.modalService.dismissAll();
        this.updatespacelist('direct');         
      })
      .catch((error) => {
        alert("Message has not been sent. Please contact administrator");
        console.error(error);
      });
  }

  openChatModal(content){
    this.modalService.open(content, this.modalOptions).result.then(
      result => {
      },
      reason => {
      }
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
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
  ngOnDestroy(){
    this.webex.listenForMemberShipEventsCleanup();
    this.membershipSubs.unsubscribe()
  }
}
