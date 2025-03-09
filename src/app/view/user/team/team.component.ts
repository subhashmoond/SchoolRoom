import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { AddTeamComponent } from './add-team/add-team.component';
import { UserService } from '../../../core/services/user.service';
import { ThisReceiver } from '@angular/compiler';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [ TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, 
    RippleModule, SkeletonModule, AddTeamComponent, ToastModule, AvatarModule, CommonModule ],
  providers : [ MessageService ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addTeamSideBar: boolean = false;
  teacherList: any = [];

  studentList = [
    { name: "Sunil", email: "sunil@gmail.com", lastlogin: "31 May, 2024", joined: "31 May, 2024" },
    { name: "Balram", email: "balram@gmail.com", lastlogin: "31 May, 2024", joined: "31 May, 2024" }
  ]


  constructor(private renderer: Renderer2, private _router: Router, private _userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getTeacherList();
  }

  getTeacherList() {
    this._userService.getTeacherList().subscribe(res => {
      if(res.status == true)
      this.teacherList = res.teacher
    })
  }

  openSidebar() {
    this.addTeamSideBar = true;
  }

  closeSideBar(event : any){

    if(event === true){
      this.messageService.add({ severity: 'success', detail: 'Teacher Created & Permissions Assigned Successfully' });
    }
    
    this.addTeamSideBar = false;
    this.getTeacherList();
  }

  onPageChange(event: any) {
  }

  viewDetails() {
    this._router.navigate(['team']);
  }

  deleteUser(data : any){

    const formData = new FormData();
    formData.append('teacher_id', data.id);

    this._userService.deleteTeacher(formData).subscribe((res : any) => {

      if(res.status === 'Success'){
        this.messageService.add({ severity: 'success', detail: 'Teacher Delete Successfully' });
        this.getTeacherList();
      }else{
        this.messageService.add({ severity: 'error', detail: res.message });
      }

    })

  }

  
  


}
