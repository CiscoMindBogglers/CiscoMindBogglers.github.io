import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private webex: WebexService, private router: Router) { }

  ngOnInit(): void {
    this.webex.beforeLogin();
    this.doLogin();
  }
  
  doLogin() {
    this.webex.doLogin();
  }

}
