import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LiveClassService } from '../../../../../core/services/live-class.service';

@Component({
  selector: 'app-live-class',
  standalone: true,
    imports: [ InputTextModule, ButtonModule, RippleModule, ReactiveFormsModule, CalendarModule],
  
  templateUrl: './live-class.component.html',
  styleUrl: './live-class.component.css'
})
export class LiveClassComponent {

  @Input() lessonId : any;
  @Output() closeSideBar = new EventEmitter<any>()

  youtubeLiveForm! : FormGroup;
  typeList : boolean = true;
  isYouTubeLiveClass : boolean = false;

  constructor( private _fb : FormBuilder, private _liveClassService : LiveClassService ){}

  ngOnInit(){

    this.youtubeLiveForm = this._fb.group({
      path : [],
      title : [],
      from : [],
      to : []
    })
  }

  selectedLiveClassType(type : any){

    switch (type) {

      case 'youtube-live':
        this.isYouTubeLiveClass = true;
        this.typeList = false
        break;

    }

  }

convertToDesiredFormat(dateString : any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  submit(){

    const formData = new FormData();
    const allFormControlNameValue =  this.youtubeLiveForm.value

    formData.append('title', allFormControlNameValue.title );
    formData.append('path', allFormControlNameValue.path );
    formData.append('lesson_id', this.lessonId );
    formData.append('livetype', "youtubelive" );
    formData.append('available_from', this.convertToDesiredFormat(allFormControlNameValue.from)  );
    formData.append('available_to', this.convertToDesiredFormat(allFormControlNameValue.to) );

    console.log(formData, "payload data ")

    this._liveClassService.addLiveClassContent(formData).subscribe((res : any) => {

      if(res.status === true){

      }

    })
  }



}
