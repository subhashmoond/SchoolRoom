import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CoursesService } from '../../../../core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { SidebarModule } from 'primeng/sidebar';
import { ImageComponent } from './image/image.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { AudioComponent } from './audio/audio.component';
import { ReSourceComponent } from './re-source/re-source.component';
import { YoutubeVideoComponent } from './youtube-video/youtube-video.component';
import { TextComponent } from './text/text.component';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { RippleModule } from 'primeng/ripple';
import { EditorModule } from 'primeng/editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CreateTestComponent } from '../../../../shared/components/create-test/create-test.component';
import { CreateTestSectionComponent } from '../../../../shared/components/create-test-section/create-test-section.component';
import { TestContentComponent } from './test-content/test-content.component';
import { LiveClassComponent } from './live-class/live-class.component';
import { TagModule } from 'primeng/tag';
import { LiveClassService } from '../../../../core/services/live-class.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chapter-content',
  standalone: true,
  imports: [AccordionModule, ButtonModule, FormsModule, SplitButtonModule, EditorModule, DialogModule, PanelModule, AvatarModule, UploadContentComponent, SidebarModule,
    ImageComponent, UploadVideoComponent, AudioComponent, PdfViewerModule, ReSourceComponent, RippleModule, SkeletonModule, YoutubeVideoComponent, TextComponent, MenuModule,
    ToastModule, SidebarModule, CreateTestComponent, CreateTestSectionComponent, TestContentComponent, LiveClassComponent, TagModule ],
  providers: [MessageService],
  templateUrl: './chapter-content.component.html',
  styleUrl: './chapter-content.component.css'
})
export class ChapterContentComponent {
  lessonId: any;
  coursesId: any;
  contentTypes: any;
  addContentPopup: boolean = false;
  uploadContents: boolean = false;
  isText: boolean = false;
  isImage: boolean = false;
  isVideo: boolean = false;
  isPDF: boolean = false;
  isResource: boolean = false;
  isYoutubevideo: boolean = false;
  isAudio: boolean = false;
  isQuiz: boolean = false;
  isSectionDetailPage: boolean = false;
  isAddSection: boolean = false;
  isLiveClass: boolean = false;
  contentId: any;
  isLoader: boolean = true;

  chapterDataList: any;
  hideHeader: boolean = true;
  testId: any;
  editLiveData : any;

  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private _coursesService: CoursesService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private _liveClassService: LiveClassService, private _messageService: MessageService) {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('id')!;
    });

    this.route.queryParams.subscribe(params => {
      this.coursesId = params['courseId'];
    });

  }


  ngOnInit() {

    this.getChapterContent()
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYouTubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extractYouTubeId(url: string): string | null {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  getChapterContent() {
    this.isLoader = true
    this._coursesService.getChapterContentList(this.coursesId, this.lessonId).subscribe((res: any) => {
      this.isLoader = false
      this.chapterDataList = res.data
    })
  }


  joinLive() {
    this.router.navigate(['/join/youtubelive']);
  }


  addContent() {
    this.addContentPopup = true
  }

  uploadContent(data?: any, contentType?: any, action?: any) {

    if (data) {
      this.contentId = data._id;
    } else {
      this.contentId = null;
    }

    this.contentTypes = action;


    switch (contentType) {

      case 'text':
        this.isText = true
        break;

      case 'Video':
        this.isVideo = true
        break;

      case 'notes':
        this.uploadContents = true
        break;

      case 'image':
        this.isImage = true
        break;

      case 'audio':
        this.isAudio = true
        break;

      case 'youtubevideo':
        this.isYoutubevideo = true
        break;

      case 'resource':
        this.isResource = true
        break;

      case 'Quiz':
        this.isQuiz = true
        break;

      case 'Live Class':
        this.isLiveClass = true
        break;
    }
    this.addContentPopup = false

  }


  editContent(contentType: any, contentId: any) {

    console.log(contentType, " New Design Data Table ")

    this.contentTypes = contentType
    this.contentId = contentId;

    switch (contentType) {

      case 'article':
        this.isText = true
        break;

      case 'video':
        this.isVideo = true
        break;

      case 'notes':
        this.uploadContents = true
        break;

      case 'image':
        this.isImage = true
        break;

      case 'audio':
        this.isAudio = true
        break;

      case 'youtube_video':
        this.isYoutubevideo = true
        break;

      case 'resource':
        this.isResource = true
        break;
    }
  }

  closeSideBar(event: any) {
    this.getChapterContent();
    this.isText = false;
    this.isResource = false;
    this.isYoutubevideo = false;
    this.isAudio = false;
    this.isImage = false;
    this.uploadContents = false;
    this.isVideo = false;
    this.isQuiz = false;
    this.isLiveClass = false;
  }

  closeSideBarliveClass() {
    this.isLiveClass = false;

  }

  deleteContent(id: any) {
    this._coursesService.deletePDF(id).subscribe(res => {
      this.getChapterContent()
    })
  }

  deleteTest(id: any) {

  }


  sectionDetailPage(data: any) {
    this.isSectionDetailPage = true;
    this.testId = data._id
  }

  createSection(data: any) {
    this.isAddSection = true;
    this.testId = data._id
  }

  editlive(data: any) {
    console.log(data, "edit live data ");
    this.editLiveData = data;
    this.isLiveClass = true;
  }


  deletelive(data: any) {

    console.log(data, "delete live ")

    if (data.type === "youtubelive") {

      this._liveClassService.deleteYouTubeLive(data._id).subscribe((res: any) => {
        if (res.status === true) {
          this._messageService.add({ severity: 'success', detail: 'Live Deleted Successfully! ' });
          this.getChapterContent()

        }
      })

    }
    if (data.type === "linkewiselive") {

      this._liveClassService.deleteLinkLive(data._id).subscribe((res: any) => {
        if (res.status === true) {
          this._messageService.add({ severity: 'success', detail: 'Live Deleted Successfully! ' });
          this.getChapterContent()

        }
      })

    }

  }

}
