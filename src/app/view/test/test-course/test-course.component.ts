import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ListTestLessionComponent } from './list-test-lession/list-test-lession.component';
import { CreateTestLessionComponent } from './create-test-lession/create-test-lession.component';

@Component({
  selector: 'app-test-course',
  standalone: true,
  imports: [TableModule, InputTextModule, EditorModule, FormsModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule, AccordionModule, ListTestLessionComponent, CreateTestLessionComponent],
  templateUrl: './test-course.component.html',
  styleUrl: './test-course.component.css'
})
export class TestCourseComponent {

  addSectionValue : boolean = false;


  constructor(){}

  ngOnInit(){

  }

  addSection(){
    this.addSectionValue = true
  }



  // drag and drop ul/ li

  instructions: string = '';


}
