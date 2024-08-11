import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CourseContentComponent } from '../course-content.component';
import { CoursesService } from '../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { flatMap } from 'rxjs';
import { ImageComponent } from './image/image.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { AudioComponent } from './audio/audio.component';
import { ReSourceComponent } from './re-source/re-source.component';
import { YoutubeVideoComponent } from './youtube-video/youtube-video.component';
import { TextComponent } from './text/text.component';

@Component({
  selector: 'app-chapter-content',
  standalone: true,
  imports: [AccordionModule, ButtonModule, SplitButtonModule, DialogModule, PanelModule, AvatarModule, UploadContentComponent, SidebarModule, 
    ImageComponent, UploadVideoComponent, AudioComponent, ReSourceComponent, YoutubeVideoComponent, TextComponent],
  templateUrl: './chapter-content.component.html',
  styleUrl: './chapter-content.component.css'
})
export class ChapterContentComponent {
  lessonId: any;
  coursesId: any;
  contentTypes!: string;
  addContentPopup: boolean = false;
  uploadContents: boolean = false;
  isText: boolean = false;
  isImage: boolean = false;
  isVideo: boolean = false;
  isPDF: boolean = false;
  isResource : boolean = false;
  isYoutubevideo : boolean = false;
  isAudio : boolean = false;


  items: { label?: string; icon?: string; separator?: boolean }[] = [];




  constructor(private _coursesService: CoursesService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('id')!;
    });

  }


  ngOnInit() {

    this.items = [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Search',
        icon: 'pi pi-search'
      },
      {
        separator: true
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];

    this._coursesService.currentCourseId$.subscribe(res => {
      this.coursesId = res
      this.getChapterContent();
    })




  }

  getChapterContent() {
    this._coursesService.getChapterContentList(this.coursesId, this.lessonId).subscribe(res => {
      console.log(res)
    })
  }


  addContent() {
    this.addContentPopup = true

  }

  uploadContent(contentType: any) {
    this.contentTypes = contentType

    switch (contentType) {

      case 'text':
        this.isText = true
        break;

      case 'Video':
        this.isVideo = true
        break;

      case 'pdf':
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


    }

  }



}
