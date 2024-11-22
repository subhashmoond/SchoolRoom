import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { QuestionTypeComponent } from "../../question/question-type/question-type.component";
import { SidebarModule } from 'primeng/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-test-lession',
  standalone: true,
  imports: [AccordionModule, ButtonModule, QuestionTypeComponent, SidebarModule],
  templateUrl: './list-test-lession.component.html',
  styleUrl: './list-test-lession.component.css'
})
export class ListTestLessionComponent {

  addQuestionSidebarVisible : boolean = false

constructor(private _router: Router){}

  openAddQuestionSidebar() {
    this.addQuestionSidebarVisible = true;
  }

  navigateDetailsPage(){
    this._router.navigate(['/test/test-details']);
  }

}
