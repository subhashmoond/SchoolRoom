import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveWebsocketService {

  
  private socket$ !: WebSocketSubject<any>;
  private serverUrl: any;

  private liveClassSubject = new BehaviorSubject<any>(null);
  liveClass$ = this.liveClassSubject.asObservable();

  constructor() {

    // Assuming we get the data from some API or other source
    const liveClassData = this.getLiveClassData();

    if (liveClassData) {
      // Here you are setting the live class data, including liveVideoChatId, to liveClass$
      this.openLiveClass(liveClassData);
    }

    const token = this.getTokenFromLocalStorage();
    if (!token) {
      console.error('Token not found in local storage.');
      return;
    }

    // Construct the WebSocket URL with liveVideoChatId dynamically
    this.serverUrl = `wss://coursaapp.com/ws/live-video-chat/${liveClassData._id}/?token=${token}`;
    console.log('WebSocket URL:', this.serverUrl);




    this.socket$ = webSocket(this.serverUrl);
    console.log('WebSocket connection initialized:', this.socket$);
  }

  private getLiveClassData() {
    return {
      _id: '540eb83a6c1e4882861d68df51887c74',
      title: 'live demo 5510',
      type: 'youtubelive',
      position: 2,
      available_from: '2025-01-20T12:22:34Z',
      available_to: '2025-01-29T12:22:37Z',
      is_preview: null,
      url: 'https://studio.youtube.com/video/wvRVDg-yeXw/livestreaming',
      thumbnail: null
    };
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
      action: 'get_messages', // Ensure this action is supported by the server
    };

    // Send the request to the WebSocket server
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
    };
    this.sendMessage(messageBody);
  }

  // Action: Get messages
  getMessagesAction(messageId: string): void {
    const messageBody = {
      action: 'get_messages',
      message_id: messageId,
      message: 'Requesting messages.',
    };
    this.sendMessage(messageBody);
  }

  // Action: Send a new message
  sendNewMessage(newMessage: string): void {
    const messageBody = {
      action: 'send_message',
      message: newMessage,
    };
    this.sendMessage(messageBody);
  }

  // Action: Delete a message
  deleteMessage(messageId: string): void {
    const messageBody = {
      action: 'delete_message',
      message_id: messageId,
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
