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
  messageInitialList=[]
  @ViewChild('f', { static: true }) form:NgForm;
  @ViewChild('MessagesList') MessagesList:ElementRef;

  constructor(private webex: WebexService, private route: ActivatedRoute,private renderer:Renderer2) {}

  ngOnInit(): void {
    this.webex.listenForMsgEvents();
    this.webex.subject.subscribe(({webexEvent,event})=>{
       if(webexEvent=='msgCreated' ){
         console.log(event.data.text)
         let change_this;
         change_this= this.renderer.createElement('li');
         change_this.textContent=event.data.text;

         this.renderer.addClass(change_this, 'me');
         this.renderer.appendChild(this.MessagesList.nativeElement, change_this)
       }

    });
    this.route.params.subscribe((params: Params) => {
      this.roomID = params['id'];
      this.name = params['name'];
      this.intial = this.webex.getUserInitial(this.name);
      this.webex.listMessages(this.roomID).then((message) => {
        console.log(message.items);
        // this.webex.fetchUserDetails(message.items.personId).then((data) => {
        //   this.messageInitialList.push(this.webex.getUserInitial(data.displayName )) ;
        // });
        this.messages = message.items.reverse();
        this.messageInitialList=this.messageInitialList.reverse();

      });

    });
  }

  addPeople() {
    this.webex.addPeople(this.email, this.roomID);
  }
  onSubmit(form: NgForm) {

    this.webex.sendMsg(this.roomID, form.value.sendMessage).then(()=>{
      form.reset()
    });
  }
 classCurrent
  direction(index){
  //console.log(index)
    if(index==0){
      this.classCurrent='right'
      //console.log(this.classCurrent)
      return this.classCurrent
    }
    else if(index>=1 && this.messages[index-1].personId==this.messages[index].personId){
      //console.log(this.classCurrent)

      return this.classCurrent
    }
    else{

      this.classCurrent=='left'?this.classCurrent='right':this.classCurrent='left';
      //console.log(this.classCurrent)

      return this.classCurrent
    }


  }
}
