import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebexService } from '../webex.service';


@Component({
  selector: 'app-webex-layout',
  templateUrl: './webex-layout.component.html',
  styleUrls: ['./webex-layout.component.scss']
})
export class WebexLayoutComponent implements OnInit {

    constructor(private webex: WebexService, public router: Router) { }

  ngOnInit(): void {
    this.webex.onInit();
    this.router.navigateByUrl("/webex/start");
  }
}
