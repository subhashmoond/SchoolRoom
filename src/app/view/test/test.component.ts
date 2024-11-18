import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateTestComponent } from './create-test/create-test.component';
import { TagModule } from 'primeng/tag';
import { TestCourseAddComponent } from './test-course-add/test-course-add.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, CreateTestComponent, TagModule, TestCourseAddComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  addFormSideBar : boolean = false;
  tableView : boolean = false

  constructor(){

  }

  ngOnInit(){
    
  }

  openSidebar(){
    this.addFormSideBar = true
  }


  listViewChange(type : any){
    if(type === 'card'){
      this.tableView = false
    }
    else{
      this.tableView = true
    }

  }
}
