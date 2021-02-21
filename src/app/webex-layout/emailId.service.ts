import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export  class emailService{
  emailId = new BehaviorSubject<string>(null);

}
