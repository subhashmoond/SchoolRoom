import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { AddSectionComponent } from './add-section/add-section.component';



@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule, AccordionModule, AddSectionComponent],
  templateUrl: './test-details.component.html',
  styleUrl: './test-details.component.css'
})
export class TestDetailsComponent {

  addSectionValue : boolean = false;


  constructor(){}

  ngOnInit(){

  }

  addSection(){
    this.addSectionValue = true
  }



}
