import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { AddBatcheComponent } from './add-batche/add-batche.component';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, AddBatcheComponent],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css'
})
export class BatchesComponent {
  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addSideBar: boolean = false;
  batchesList: any = [];

  studentList = [
    { name: "Angular Developer", subject: "Hindi", student: "subhash" },
    { name: "Front End Developer", subject: "Hindi", student: "subhash" }
  ]


  constructor(private renderer: Renderer2, private _router: Router, private _userService: UserService) {

  }

  ngOnInit() {
    this.getBatcheList();
  }

  getBatcheList() {
    this._userService.getTeacherList().subscribe(res => {
      this.batchesList = res;
    })
  }

  openSidebar() {
    this.addSideBar = true;
  }

  onPageChange(event: any) {
  }

  viewDetails() {
    this._router.navigate(['team']);
  }
}
