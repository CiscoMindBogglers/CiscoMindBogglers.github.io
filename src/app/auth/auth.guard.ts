import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { WebexService } from '../webex.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private webex: WebexService) {

    }
    canActivate() {
        console.log("Inside can activate");
        console.log(this.webex.isAuthorized());
        if (this.webex.isAuthorized()) {
            console.log("Autorized");
            return true;
        }
        else {
            this.router.navigate(['']);
            return false;
        }
    }
}