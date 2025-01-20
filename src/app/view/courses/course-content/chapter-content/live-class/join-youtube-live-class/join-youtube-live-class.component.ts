import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-join-youtube-live-class',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, InputTextModule, ConfirmDialogModule ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './join-youtube-live-class.component.html',
  styleUrl: './join-youtube-live-class.component.css'
})
export class JoinYoutubeLiveClassComponent {

  messageValue : any;
  isliveScreen : boolean = false;

  constructor( private router : Router, private _confirmationService: ConfirmationService, private sanitizer: DomSanitizer) { }


  ngOnInit(){

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
