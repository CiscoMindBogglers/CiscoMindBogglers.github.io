import { Component, OnInit } from '@angular/core';
import { WebexService } from 'src/app/webex.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {

  constructor(private webex: WebexService) { }

  ngOnInit(): void {
    this.webex.listRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      var isNote=false;
      rooms.items.forEach(element => {
        if(element.title==="NoteToSelf"){
          isNote=true;
        }
      });
      if(!isNote){
        this.webex.createRoom("NoteToSelf").then((room) => {
          console.log("Notespace created");
            })
            .catch((error) => {
              alert("Space not successfully created. Please contact administrator");
              console.error(error);
            });
          }       
        
      });
  }

}
