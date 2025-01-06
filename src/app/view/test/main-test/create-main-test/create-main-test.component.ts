import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-main-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './create-main-test.component.html',
  styleUrl: './create-main-test.component.css'
})
export class CreateMainTestComponent {

  addTestForm!: FormGroup;
  activeIndex: number = 0;
  items: any;
  courseList : any;

  charCount: number = 0; // Initialize character count

  constructor(private fb: FormBuilder) {
    this.addTestForm = this.fb.group({
      title: [''],
      totaltime: [''],
      maxmark: [''],
      supportanotherlang : [false],
      another_lang : ['']
    });
  }

  updateCharacterCount() {
    this.charCount = this.addTestForm.get('name')?.value?.length || 0;
  }

  


  next() {
    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  back() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

}
