import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebexService } from 'src/app/webex.service';
import { emailService } from '../emailId.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.scss'],
})
export class SpaceDetailsComponent implements OnInit, OnDestroy {
  email = '';
  roomID = '';
  message = '';
  name = '';
  intial: string;
  messages;
  type;
  messageInitialList = [];
  map
  currentUserEmail: string = '';
  @ViewChild('f', { static: true }) form: NgForm;
  roomSubs: Subscription;
  addParticipantsForm: FormGroup;
  modalOptions: NgbModalOptions;

  constructor(private webex: WebexService, private route: ActivatedRoute, private router: Router, private emailService: emailService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      windowClass: 'fade in'
    }
  }

  ngOnInit(): void {
    this.webex.listenForMsgEvents();
    this.roomSubs = this.webex.subject.subscribe(({ webexEvent, event }) => {
      if (webexEvent == 'msgCreated') {
        if (event.data.roomId == this.roomID) {
          this.messages.push(event.data)
        }
      }

    });
    this.emailService.emailId.pipe(take(2)).subscribe((email) => {
      this.currentUserEmail = email;
    })
    this.route.params.subscribe((params: Params) => {
      this.roomID = params['id'];
      this.name = params['name'];
      this.type = params['type'];
      this.intial = this.webex.getUserInitial(this.name);
      this.map = new Map();
      this.webex.listMessages(this.roomID).then((message) => {
        console.log(message.items);

        console.log(this.messageInitialList)
        this.messages = message.items.reverse();
        this.messages.forEach(element => {

          this.webex.fetchUserDetails(element.personId).then((data) => {
            if (!this.map.has(data.id)) {
              this.map.set(data.id, data.displayName)
            }
          });

        });
      });

    });
  }
  getInitial(name) {
    return this.webex.getUserInitial(name)
  }
  exitRoom() {
    this.webex.removePeople(this.currentUserEmail, this.roomID).then(() => {
      console.log("exited space")
      // this.router.navigate(["/webex"]);
    })
  }
  onSubmit(form: NgForm) {

    this.webex.sendMsg(this.roomID, form.value.sendMessage).then(() => {
      form.reset()
    });
  }
  classCurrent
  direction(index) {
    if (index == 0) {
      this.classCurrent = 'right'
      return this.classCurrent
    }
    else if (index >= 1 && this.messages[index - 1].personId == this.messages[index].personId) {
      return this.classCurrent
    }
    else {

      this.classCurrent == 'left' ? this.classCurrent = 'right' : this.classCurrent = 'left';
      return this.classCurrent
    }
  }
  get controls() {
    return (this.addParticipantsForm.get('memberMailID') as FormArray).controls;
  }
  onAddMember() {
    const control = new FormControl(null);
    (this.addParticipantsForm.get('memberMailID') as FormArray).push(control);
  }
  onDeleteMember(index: number) {
    (this.addParticipantsForm.get('memberMailID') as FormArray).removeAt(index);
  }
  onAddUser(memberMailID: []) {
    memberMailID.forEach((element) => {
      if (element != null) {
        this.webex.addPeople(element, this.roomID);
      }
    });
    this.modalService.dismissAll()
  }
  onSubmitPartcipants() {
    this.onAddUser(this.addParticipantsForm.value.memberMailID)
  }
  openModal(content) {
    this.addParticipantsForm = new FormGroup({
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
  getAttachment(file) {
    if (file) {
      return this.webex.getAttachemnt(file)
    } else {
      return "";
    }
  }

  ngOnDestroy() {
    this.webex.listenForMsgEventsCleanup();
    this.roomSubs.unsubscribe();
  }
}
