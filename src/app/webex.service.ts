import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import WebexSDK from 'webex';

@Injectable({
  providedIn: 'root',
})
export class WebexService {
  webex: any;
  registered: boolean;
  syncStatus: string;
  currentMeeting: any;
  subject: Subject<any> = new Subject();
  MemberShipsubject :Subject<any> = new Subject();

  constructor(public router: Router) { }

  async listenForWebex() {
    this.webex.once(`ready`, () => {
      console.log('READY', this.webex.credentials.supertoken);
      if (this.webex.credentials.supertoken) {
        localStorage.setItem(
          'webex_token',
          this.webex.credentials.supertoken.access_token
        );
      }
    });
  }

  beforeLogin() {
    if (this.isAuthorized()) {
      this.router.navigate(['/webex']);
    } else {
      this.webex = WebexSDK.init({
        config: {
          meetings: {
            deviceType: 'WEB',
          },
          credentials: {
            client_id: environment.client_id,
            redirect_uri: environment.redirect_uri,
            scope: environment.scope,
          },
        },
      });
      this.listenForWebex();
    }
  }

  doLogin() {
    this.webex.authorization.initiateLogin();
  }
  isAuthorized(): boolean {
    this.onInit();
    if (this.webex.canAuthorize ||
      this.webex.credentials.supertoken ||
      localStorage.getItem('webex_token')
    ) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    if (this.webex) {
      if (this.webex.canAuthorize) {
        console.log('Already Logged in');
        this.webex.logout();
      } else {
        this.webex.logout();
        console.log('Cannot logout when no user is authenticated');
      }
      localStorage.removeItem('webex_token');
    }
  }

  onInit() {
    this.webex = WebexSDK.init({
      config: {
        meetings: {
          deviceType: 'WEB',
        },
      },
      credentials: {
        access_token: localStorage.getItem('webex_token'),
      },
    });
    this.listenForWebex();
  }

  async fetchMyDetails() {
    return this.webex.people.get('me');
  }

  getUserInitial(name: string) {
    var initial = '';
    try {
      initial = name
        .split(' ')
        .map((n) => n[0])
        .join('').substring(0, 2);;
    } catch (e) {
      if (name != undefined) {
        initial = name.charAt(0);
      }
    }
    return initial;
  }

  getFirstName(name: string) {
    return name.split(' ')[0];
  }
  getLastName(name: string) {
    return name.split(' ')[1] || "";
  }

  async fetchUserDetails(id: string) {
    return this.webex.people.get(id);
  }

  async searchPeople(searchText: string, shouldFetchAll: boolean = false) {
    return this.webex.people.list({
      displayName: searchText,
      showAllTypes: shouldFetchAll,
    });
  }

  async listRoom(limit: number = 1000) {
    return this.webex.rooms.list({ max: limit, sortBy: 'lastactivity' });
  }
  async filterListRoom(type) {
    return this.webex.rooms.list({
      max: 1000,
      sortBy: 'lastactivity',
      type: type,
    });
  }

  async createRoom(name: string) {
    try {
      return await this.webex.rooms.create({ title: name });
    } catch (error) {
      console.log(error);
    }
  }

  async getRoom(id: string) {
    return this.webex.rooms.get(id);
  }

  async leaveRoom(id: string) {
    return this.webex.rooms.remove(id);
  }

  async addPeople(email: string, roomid: string) {
    return this.webex.memberships.create({
      personEmail: email,
      roomId: roomid,
    });
  }
  async removePeople(email: string, roomid: string) {
    this.webex.memberships.list({ roomId: roomid }).then((memberships) => {
      console.log(memberships.items);
      memberships.items.forEach((element) => {
        console.log(element.personEmail);
        console.log(email);
        if (element.personEmail == email) {
          this.webex.memberships.remove(element).then((result)=>{
            console.log("Inside Remove Space")
                return result
          });
        }
      });
    });
  }

  async listMessages(roomId: string) {
    return this.webex.messages.list({ roomId: roomId });
  }

  async sendMsg(roomid, msg) {
    return this.webex.messages.create({
      text: msg,
      roomId: roomid,
    });
  }

  async listenRoom() {
    return this.webex.rooms.listen();
  }

  listenForMsgEvents() {
    this.webex.messages.listen().then(() => {
      console.log('listening to message events');
      this.webex.messages.on('created', (event) =>
        this.subject.next({ webexEvent: 'msgCreated', event })
      );
      this.webex.messages.on('deleted', (event) =>
        this.subject.next({ webexEvent: 'msgDeleted', event })
      );
    });
  }
  listenForMsgEventsCleanup() {
    this.webex.rooms.stopListening();
    this.webex.rooms.off('created');
    this.webex.rooms.off('deleted');
  }
  listenForMemberShipEvents() {
    this.webex.memberships.listen().then(() => {
      console.log('listening to membership events');
      this.webex.memberships.on('created', (event) =>
        this.MemberShipsubject.next({ webexEvent: 'memberShipCreated', event })
      );
      this.webex.memberships.on('deleted', (event) => {
        this.MemberShipsubject.next({ webexEvent: 'memberShipDeleted', event });
        console.log('Deleted');
      });
      this.webex.memberships.on('updated', (event) => {
        this.MemberShipsubject.next({ webexEvent: 'memberShipUpdated', event });
        console.log('Updated');
      });
    });
  }
  listenForMemberShipEventsCleanup() {
    this.webex.memberships.stopListening();
    this.webex.memberships.off('created');
    this.webex.memberships.off('updated');
    this.webex.memberships.off('deleted');
  }
  receiveNewMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  async onRegister() {
    try {
      await this.webex.meetings.register();
      this.registered = true;
    } catch (error) {
      console.log(error);
    }
  }
  async onUnregister() {
    try {
      await this.webex.meetings.unregister();
      this.registered = false;
    } catch (error) {
      console.error(error);
    }
  }
  async onSyncMeetings() {
    try {
      this.syncStatus = 'SYNCING';
      await this.webex.meetings.syncMeetings();
      this.syncStatus = 'SYNCED';
    } catch (error) {
      this.syncStatus = 'ERROR';
      console.error(error);
    }
  }
  async createMeeting(destination) {
    try {
      this.currentMeeting = await this.webex.meetings.create(destination);
    } catch (error) {
      console.error(error);
    }
  }
  printMeeting() {
    if (this.currentMeeting) {
      return this.currentMeeting.id;
    }
    return 'No Meeting';
  }
  replaceURLWithHTMLLinks (text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp, "<a href='$1'>$1</a>");
  }
}
