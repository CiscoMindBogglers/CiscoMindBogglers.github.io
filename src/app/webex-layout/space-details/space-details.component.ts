import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { WebexService } from 'src/app/webex.service';

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.scss'],
})
export class SpaceDetailsComponent implements OnInit {
  email = '';
  roomID = '';
  message = '';
  name = '';
  intial: string;
  messages;
  type;
  messageInitialList = [];
  map
  @ViewChild('f', { static: true }) form: NgForm;


  constructor(private webex: WebexService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.webex.onInit();
    this.webex.listenForMsgEvents();
    this.webex.subject.subscribe(({ webexEvent, event }) => {
      if (webexEvent == 'msgCreated') {
        if (event.data.roomId == this.roomID) {
          this.messages.push(event.data)
        }
      }

    });
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
  getInitial(name){
    return this.webex.getUserInitial(name)
  }
  addPeople() {
    //this.webex.addPeople(this.email, this.roomID);
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
}
