import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { NewsfeedService } from '../../core/services/newsfeed.service';
import { TagModule } from 'primeng/tag';
import { AddPostComponent } from './add-post/add-post.component';

@Component({
  selector: 'app-newsfeed',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule,
    RippleModule, SkeletonModule, ToastModule, TagModule, AddPostComponent],
  providers: [MessageService],
  templateUrl: './newsfeed.component.html',
  styleUrl: './newsfeed.component.css'
})
export class NewsfeedComponent {

  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addStudentSideBar: boolean = false;
  openDropdownId: number | null = null;
  editItemData: any;
  isLoader: boolean = false;

  newsFeedtList: any = [];

  constructor(private renderer: Renderer2, private _router: Router, private _messageService: MessageService, private _newsfeedService: NewsfeedService) {
  }

  ngOnInit() {
    this.getNewsFeedData();
  }


  toggleDropdown(itemId: any) {
    this.openDropdownId = this.openDropdownId === itemId ? null : itemId;
  }

  editCoupons(data: any) {
    this.addStudentSideBar = true;
    this.editItemData = data
  }

  publisheNews(id: any, type: any) {

    if (type === 'Published') {
      var payload = {
        "isPublished": true
      }
    }else{
      var payload = {
        "isPublished": false
      }
    }

    this._newsfeedService.postStatusUpdate(id, payload).subscribe((res : any) => {
      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: 'News Feed Status Updated Successfully' });
      }else{
        this._messageService.add({ severity: 'error', detail: res.message });
      }
    this.getNewsFeedData();
    })


  }

  deletePost(id: any) {

    this._newsfeedService.deletePost(id).subscribe((res : any) => {

      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: res.message });
      }else{
        this._messageService.add({ severity: 'error', detail: res.message });
      }

    })

  }

  getNewsFeedData() {
    this.isLoader = true;
    this._newsfeedService.getNewsFeedList().subscribe(res => {
      this.isLoader = false;
      this.newsFeedtList = res.data
    })
    // this._couponService.getCouponsList().subscribe(res => {
    //   this.isLoader = false;
    //   this.couponstList = res.data;
    // })
  }

  openSidebar() {
    this.addStudentSideBar = true;
  }

  onPageChange(event: any) {
  }

  viewDetails() {
    this._router.navigate(['/user/student-view']);
  }

  closeSideBar() {
    this.addStudentSideBar = false;
    this.getNewsFeedData();
  }

}
