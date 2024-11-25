import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button'; 
import { TagModule } from 'primeng/tag'; 



@Component({
  selector: 'app-main-test',
  standalone: true,
  imports: [ButtonModule, TagModule],
  templateUrl: './main-test.component.html',
  styleUrl: './main-test.component.css'
})
export class MainTestComponent {

  showMoreOptions: boolean = false;

  goBack() {
    window.history.back();  // Go back to the previous page
  }


  toggleOptions() {
    this.showMoreOptions = !this.showMoreOptions;  // Toggle the visibility of buttons
  }

  onRefresh(){
    location.reload();
  }
  
  onContinue() {
    console.log('Continue clicked for Test 2');
    // Add logic to navigate to the quiz builder or handle quiz creation for Test 2
    alert('Quiz builder for Test 2 will be implemented.');
  }

}
