import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private webex: WebexService) { }

  ngOnInit(): void {
    this.webex.beforeLogin();
  }

}
