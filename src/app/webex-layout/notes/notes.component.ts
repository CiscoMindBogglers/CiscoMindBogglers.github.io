import { Component, OnInit } from '@angular/core';
import { WebexService } from 'src/app/webex.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {

  constructor(private webex: WebexService) { }
  noteMsgs: any;
  ngOnInit(): void {
    this.webex.listRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      var isNote = false;
      rooms.items.forEach(element => {
        if (element.title === "NoteToSelf") {
          localStorage.setItem(
            'note_room_id',
            element.id
          );
          isNote = true;
        }
      });
      if (!isNote) {
        this.webex.createRoom("NoteToSelf").then((room) => {
          localStorage.setItem(
            'note_room_id',
            room.id
          );
          console.log("Notespace created");
          isNote = true;
        })
          .catch((error) => {
            alert("Space not successfully created. Please contact administrator");
            console.error(error);
          });
      }

    });
    this.noteMsgs = this.getNoteMessages();
  }

  getNoteMessages() {
    this.webex.listMessages(localStorage.getItem('note_room_id')).then((messageDetails) => {
      console.log( "msgs");
      console.log( messageDetails.items);
      return messageDetails;
    })
      .catch((error) => {
        console.error(error);
        return {};
      });
  }

}
