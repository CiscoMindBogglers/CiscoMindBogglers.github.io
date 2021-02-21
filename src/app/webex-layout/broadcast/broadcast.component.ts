import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { WebexService } from 'src/app/webex.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.sass']
})
export class BroadcastComponent implements OnInit {

  constructor(private webex: WebexService) { }
  rooms: any;
  public exampleData: Array<Select2OptionData>;
  public options: Options;
  public _value: string[];

  get value(): string[] {
    return this._value;
  }
  set value(value: string[]) {
    console.log('Set value: ' + value);
    this._value = value;
  }

  ngOnInit(): void {
    this.exampleData = [
      {
        id: 'multiple1',
        text: 'Multiple 1'
      },
      {
        id: 'multiple2',
        text: 'Multiple 2'
      },
      {
        id: 'multiple3',
        text: 'Multiple 3'
      },
      {
        id: 'multiple4',
        text: 'Multiple 4'
      }
    ];

    this._value = ['multiple2', 'multiple4'];

    this.options = {
      width: '300',
      multiple: true,
      tags: true
    };
    this.webex.listRoom().then((rooms) => {
      console.log("Printing rooms")
      console.log(rooms.items);
      this.rooms = rooms.items;
    });
  }

}
