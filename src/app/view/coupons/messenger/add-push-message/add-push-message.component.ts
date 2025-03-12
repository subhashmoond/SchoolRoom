import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CoursesService } from '../../../../core/services/courses.service';
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { MarketingService } from '../../../../core/services/marketing.service';

@Component({
  selector: 'app-add-push-message',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule, InputTextModule, ToolbarModule, KeyFilterModule, ButtonModule, SidebarModule, CalendarModule,
    CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule, CheckboxModule, DropdownModule, InputTextareaModule, FileUploadModule
  ],
  providers: [MessageService],
  templateUrl: './add-push-message.component.html',
  styleUrl: './add-push-message.component.css'
})
export class AddPushMessageComponent {

  @Output() closeform = new EventEmitter<any>();



  campaignFrom!: FormGroup;
  coursesList: any;
  digitalProductList: any;
  targetAuidenseItemDataList: any;
  targetPageProductDataList: any;
  targetAudienceType = [
    { name: "All learners", id: 'all_learners' },
    { name: "Course Wise learners", id: 'course_wise_learners' },
    { name: "Digital Product Wise learners", id: 'digital_product_wise_learners' }
  ]

  targetPageType = [
    { name: "Home", id: 'home' },
    { name: "Course", id: 'course' },
    { name: "Digital Product", id: 'digital_product' },
    { name: "Notification", id: 'notification' }
  ]

  deviceType = [
    { name: "All", id: 'all' },
    { name: "Web", id: 'web' },
    { name: "Mobile", id: 'mobile' }
  ]


  // Upload Image 
  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  activeButton: string = 'now';
  scheduledTime: boolean = false;

  // all_learners,course_wise_learners,digital_product_wise_learners

  constructor(private _fb: FormBuilder, private _coursesService: CoursesService, private _digitalService: DigitalProductService, private _marketingService: MarketingService, private messageService: MessageService) { }

  ngOnInit() {
    this.form();
    this.getCourseList();

  }


  setActiveButton(button: string) {
    this.activeButton = button;
    if (button === 'scheduled') {
      this.scheduledTime = true
    } else {
      this.scheduledTime = false
    }
  }


  form() {
    this.campaignFrom = this._fb.group({
      title: ['', Validators.required],
      deviceType: ['', Validators.required],
      targetAudience: ['', Validators.required],
      targetAudienceProduct: [''],
      targetScreenType: ['', Validators.required],
      targetScreenPoint: [''],
      notificationtitle: ['', Validators.required],
      message: ['', Validators.required],
      scheduleddate: ['']
    });
  }

  onTargetAudienceChange(event: any) {
    console.log(event, "asd SAD asd SD")

    if (event.value === 'course_wise_learners') {

      this._coursesService.getCourseListTypeWaisWithOutFilter().subscribe(res => {
        this.targetAuidenseItemDataList = res.courses
        console.log(res, "with out type")
      })

    }


    if (event.value === 'digital_product_wise_learners') {

      this._digitalService.getDigitalProduct().subscribe(res => {
        this.targetAuidenseItemDataList = res.data
      })

    }


  }

  onTargetPageChange(event: any) {
    if (event.value === 'course') {

      this._coursesService.getCourseListTypeWaisWithOutFilter().subscribe(res => {
        this.targetPageProductDataList = res.courses
        console.log(res, "with out type")
      })

    }


    if (event.value === 'digital_product') {

      this._digitalService.getDigitalProduct().subscribe(res => {
        this.targetPageProductDataList = res.data
      })

    }

  }

  getCourseList() {
    this._coursesService.getCourseListTypeWais('Live').subscribe(res => {
      this.coursesList = res.courses
    })
  }

  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFile = event.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFileObjectUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  profileImageRemove() {
    this.selectedFileObjectUrl = null;
    this.fileUpload.clear();
    this.selectedFile = 'null';
    this.fileUpload = 'null'
  }


  closeSideBar() {

  }

  submit() {

    debugger
    console.log(this.campaignFrom.get('scheduleddate')?.value)

    const date = this.campaignFrom.get('scheduleddate')?.value;
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    // now Date And Time 
    const userSelectedDate: Date | null = null
    const nowdate = userSelectedDate ? new Date(userSelectedDate) : new Date();
    const nowformattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;



    const formValue = this.campaignFrom.value;
    const formData = new FormData();



    formData.append('name', formValue.title),
      formData.append('device_type', formValue.deviceType),
      formData.append('target_audience', formValue.targetAudience),

      formData.append('title', formValue.notificationtitle),
      formData.append('message', formValue.message),
      formData.append('image', this.selectedFile),
      formData.append('target_point_type', formValue.targetScreenType),
      formData.append('target_point_id', formValue.targetScreenPoint)

    if (this.scheduledTime) {
      formData.append('scheduled_date', formattedDate);
    } else {
      formData.append('scheduled_date', nowformattedDate);
    }

    const productIds = Array.isArray(formValue.targetAudienceProduct)
      ? formValue.targetAudienceProduct
      : [formValue.targetAudienceProduct];

    if (formValue.targetAudience === 'course_wise_learners') {
      formData.append('course_ids', JSON.stringify(productIds))
    } else {
      formData.append('product_ids', JSON.stringify(productIds))
    }


    this._marketingService.createCampaign(formData).subscribe((res: any) => {
      if (res.status) {
        this.messageService.add({ severity: 'success', detail: "Campaign created successfully!" });
        this.closeform.emit('done');
        this.campaignFrom.reset()
      } else {
        this.messageService.add({ severity: 'error', detail: res.message });
      }
    })

  }

  back() {
    this.closeform.emit('back');
  }

}
