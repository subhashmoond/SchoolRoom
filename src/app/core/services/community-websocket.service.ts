import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class CommunityWebsocketService {



  private socket$ !: WebSocketSubject<any>;
  private serverUrl: any;

  private liveClassSubject = new BehaviorSubject<any>(null);
  liveClass$ = this.liveClassSubject.asObservable();

  constructor() {

    // Assuming we get the data from some API or other source
    // const groupData = this.getGroupData();

    // if (groupData) {
    //   this.openLiveClass(groupData);
    // }

    // Construct the WebSocket URL with liveVideoChatId dynamically
    // this.serverUrl = `wss://coursaapp.com/ws/group-chat/${groupData.id}/`
    // console.log('WebSocket URL:', this.serverUrl);

    // this.socket$ = webSocket(this.serverUrl);
    // console.log('WebSocket connection initialized:', this.socket$);
  }


  setGroupData(data : any){

    this.serverUrl = `wss://coursaapp.com/ws/group-chat/${data.id}/`
    console.log('WebSocket URL:', this.serverUrl);

    this.socket$ = webSocket(this.serverUrl);

    console.log(data, "group data log in service community websocet service")
  }


  private getTokenFromLocalStorage(): string | null {
    // Retrieve the stored user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Parse the stored JSON data to access the access_token
      const parsedData = JSON.parse(userData);
      const token = parsedData?.access_token || null;
      console.log(token, "local storage access_token value");
      return token;
    } else {
      console.error('userData not found in localStorage.');
      return null;
    }
  }


  openLiveClass(data: any): void {
    this.liveClassSubject.next(data);
  }

  // Add this method to the WebSocketService class
  getAllMessages(): void {
    const messageBody = {
      action: 'get_messages',
      token : this.getTokenFromLocalStorage()
    };

    this.sendMessage(messageBody);
  }

  // Generalized method to send messages
  sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket connection not initialized.');
    }
  }

  // Action: Edit a message
  editMessage(messageId: string, newMessage: string): void {
    const messageBody = {
      action: 'edit_message',
      message_id: messageId,
      message: newMessage,
      token : this.getTokenFromLocalStorage()
    };
    this.sendMessage(messageBody);
  }

  // Action: Get messages
  getMessagesAction(messageId: string): void {
    const messageBody = {
      action: 'get_messages',
      message_id: messageId,
      message: 'Requesting messages.',
      token : this.getTokenFromLocalStorage()
    };
    this.sendMessage(messageBody);
  }

  // Action: Send a new message
  sendNewMessage(newMessage: string): void {
    const messageBody = {
      action: 'send_message',
      message: newMessage,
      token : this.getTokenFromLocalStorage()
    };
    this.sendMessage(messageBody);
  }

  // Action: Delete a message
  deleteMessage(messageId: string): void {
    const messageBody = {
      action: 'delete_message',
      message_id: messageId,
      token : this.getTokenFromLocalStorage()
    };
    this.sendMessage(messageBody);
  }

  // Get data from WebSocket
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Close the WebSocket connection
  closeConnection(): void {
    this.socket$.complete();
  }

  


}
