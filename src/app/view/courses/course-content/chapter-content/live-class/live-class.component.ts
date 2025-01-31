import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LiveClassService } from '../../../../../core/services/live-class.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-live-class',
  standalone: true,
  imports: [InputTextModule, ButtonModule, RippleModule, ReactiveFormsModule, CalendarModule, ToastModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './live-class.component.html',
  styleUrl: './live-class.component.css'
})
export class LiveClassComponent {

  @Input() lessonId: any;
  @Input() editLiveData: any;
  @Output() closeSideBar = new EventEmitter<any>()

  youtubeLiveForm!: FormGroup;
  editLiveForm!: FormGroup;
  typeList: boolean = true;
  isYouTubeLiveClass: boolean = false;
  isLinkClass: boolean = false;
  isEditLive: boolean = false;
  liveType: any;
  liveByIdDetail: any


  constructor(private _fb: FormBuilder, private _liveClassService: LiveClassService, private _messageService: MessageService,) { }

  ngOnInit() {


    if (this.editLiveData?.type === "youtubelive") {
      this.isEditLive = true;
      this.getLiveDetail();
    }

    if(this.editLiveData?.type === "linkewiselive"){
      this.isEditLive = true;
      this.getLiveDetail();
    }

    this.youtubeLiveForm = this._fb.group({
      path: [],
      title: [],
      from: [],
      to: []
    })


    this.editLiveForm = this._fb.group({
      title: [],
      duration: [],
      from: [],
      to: [],
      watermark: [],
      preview : []
    })


  }


  getLiveDetail() {

    if(this.editLiveData.type === "youtubelive"){
      this._liveClassService.getliveDetailById(this.editLiveData._id).subscribe(res => {
        this.liveByIdDetail = res;
  
        this.editLiveForm.patchValue({
          title: this.liveByIdDetail.title,
          duration: this.liveByIdDetail.duration,
          from: new Date(this.liveByIdDetail.available_from),
          to: new Date(this.liveByIdDetail.available_to),
          watermark: this.liveByIdDetail.enable_Watermark
        })
  
      })
    }


    if(this.editLiveData.type === "linkewiselive"){
      this._liveClassService.getlinkliveDetailById(this.editLiveData._id).subscribe(res => {
        this.liveByIdDetail = res;
  
        this.editLiveForm.patchValue({
          title: this.liveByIdDetail.title,
          duration: this.liveByIdDetail.duration,
          from: new Date(this.liveByIdDetail.available_from),
          to: new Date(this.liveByIdDetail.available_to),
          watermark: this.liveByIdDetail.enable_Watermark
        })
  
      })
    }


  }

  selectedLiveClassType(type: any) {

    this.liveType = type;
    this.isYouTubeLiveClass = true;
    this.typeList = false;

    // switch (type) {

    //   case 'youtube-live':
    //     this.isYouTubeLiveClass = true;
    //     this.typeList = false
    //     break;

    //   case 'linkewiselive':
    //     this.isLinkClass = true;
    //     break;

    // }

  }

  convertToDesiredFormat(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  submit() {

    const formData = new FormData();
    const allFormControlNameValue = this.youtubeLiveForm?.value

    formData.append('title', allFormControlNameValue?.title);
    formData.append('path', allFormControlNameValue?.path);
    formData.append('lesson_id', this.lessonId);
    formData.append('livetype', this.liveType);
    formData.append('available_from', this.convertToDesiredFormat(allFormControlNameValue?.from));
    formData.append('available_to', this.convertToDesiredFormat(allFormControlNameValue?.to));

    console.log(formData, "payload data ")

    if (this.liveType === 'youtubelive') {

      this._liveClassService.addLiveClassContent(formData).subscribe((res: any) => {

        if (res.status === true) {
          this._messageService.add({ severity: 'success', detail: 'Live Scheduled Successfully! ' });
          this.closeSideBar.emit(false)
        }

      })

    } else {

      this._liveClassService.addLinkLiveContent(formData).subscribe((res: any) => {

        if (res.status === true) {
          this._messageService.add({ severity: 'success', detail: 'Live Scheduled Successfully! ' });
          this.closeSideBar.emit(false)
        }

      })

    }

  }

  submitEdit() {

    const formValue = this.editLiveForm.value
    const payload = {
      "title": formValue.title,
      "duration": formValue.duration,
      "enable_Watermark": formValue.watermark,
      "available_from": this.convertToDesiredFormat(formValue.from),
      "available_to": this.convertToDesiredFormat(formValue.to),
      "is_preview": formValue.preview
    }

    if(this.liveByIdDetail.type === "youtubelive"){

      this._liveClassService.editYoutubeLive(this.liveByIdDetail.id, payload).subscribe(res => {
        this.closeSideBar.emit(false)
      })

    }
    
    if(this.liveByIdDetail.type === "linkewiselive"){

      this._liveClassService.editLinkLive(this.liveByIdDetail.id, payload).subscribe(res => {
        this.closeSideBar.emit(false)
      })

    }


    console.log(payload, "edit form value")

  }



}
