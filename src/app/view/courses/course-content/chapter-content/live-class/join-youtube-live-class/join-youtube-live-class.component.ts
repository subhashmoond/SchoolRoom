import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LiveWebsocketService } from '../../../../../../core/services/live-websocket.service';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-join-youtube-live-class',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, InputTextModule, ConfirmDialogModule, AvatarModule ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './join-youtube-live-class.component.html',
  styleUrl: './join-youtube-live-class.component.css'
})
export class JoinYoutubeLiveClassComponent {

  messageValue : any;
  isliveScreen : boolean = false;

  videoData :any;
  messagesList : any;

  @ViewChild('chatContainer') chatContainer!: ElementRef;


  constructor( private router : Router, private _confirmationService: ConfirmationService, private sanitizer: DomSanitizer, private _liveWebsocketService : LiveWebsocketService) { }


  ngOnInit(){

    this._liveWebsocketService.liveClass$.subscribe(res => {
      this.videoData = res;
      console.log(res, "live detail")
    })

    this.getMessages();

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const container = this.chatContainer?.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  getMessages(){

    // Subscribe to WebSocket messages
    this._liveWebsocketService.getMessages().subscribe({
      next: (message) => {
        // console.log('Received message:', message);
        // Handle the server's response for all messages
        if (message.action === 'all_messages') {
          this.messagesList = message.messages;
          console.log(this.messagesList, "get all messages list data")
        }
      },
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed'),
    });

    

    // Request all messages
    this._liveWebsocketService.getAllMessages();

  }

  sendMessage(): void {
    if (this.messageValue.trim()) {
      this._liveWebsocketService.sendNewMessage(this.messageValue);
      console.log('Message sent:', this.messageValue);
      this.messageValue = ''; // Clear the input field after sending
    } else {
      console.warn('Cannot send an empty message.');
    }

    this.getMessages();
  }


  joinYoutubeLive(){}

  leaveMeeting(){
    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to exit live session ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        window.history.back();
        
      },
      reject: () => {

      }

    });
  }

  getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYouTubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extractYouTubeId(url: string): string | null {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

}
