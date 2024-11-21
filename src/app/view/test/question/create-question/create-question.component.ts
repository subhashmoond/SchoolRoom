import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [SidebarModule, ButtonModule ],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css'
})
export class CreateQuestionComponent {
  addQuestionSidebarVisible : boolean = false;


}
