import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(private webex: WebexService) {}

  ngOnInit() {
    this.webex.beforeLogin()
  }

  ngOnDestroy() {

  }

}
