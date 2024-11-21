import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-question-type',
  standalone: true,
  imports: [SidebarModule, ],
  templateUrl: './question-type.component.html',
  styleUrl: './question-type.component.css'
})
export class QuestionTypeComponent {
  addQuestionSidebarVisible : boolean = true

}
