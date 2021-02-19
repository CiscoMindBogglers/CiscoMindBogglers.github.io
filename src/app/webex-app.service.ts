import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import WebexSDK from 'webex'

@Injectable({
  providedIn: 'root'
})

export class WebexService {
  webex: any

  onBeforeLogin() {
    this.webex = WebexSDK.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: environment.client_id,
          redirect_uri: environment.redirect_uri,
          scope: environment.scope
        }
      }
    });
    this.webex.authorization.initiateLogin();
    this.setTokenInLocalStorage(); 
  }

  onInit() {
    this.webex = WebexSDK.init({
        config: {
          meetings: {
            deviceType: 'WEB'
          }
        },
        credentials: {
          access_token: localStorage.getItem('webex_app_token')
        }
    })
    this.setTokenInLocalStorage();
  }

  public onCreateRoom(name: string) {
    return this.webex.rooms.create({ title: name });
  }

  public addMembers(req: any) {
    return this.webex.memberships.create(req)
  }

  public sendMessage(req: any) {
    return this.webex.messages.create(req); 
  }

  public getMessages(roomId){
    return this.webex.messages
      .list({ roomId:roomId,max:5000});
  }


  async setTokenInLocalStorage() {
    this.webex.once(`ready`, () => {
      if (this.webex.credentials.supertoken){
        localStorage.setItem('webex_app_token', this.webex.credentials.supertoken.access_token)
      }
    });
  }

  onLogout() {
    if(this.webex) {
      if (this.webex.canAuthorize) {
        console.log('Already Logged in')
        this.webex.logout();
      }
      else {
        this.webex.logout();
        console.log('Cannot logout when no user is authenticated')
      }
      localStorage.removeItem('webex_token');
    }
  }
}
