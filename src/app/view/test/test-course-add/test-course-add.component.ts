import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,   } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-course-add',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,],
  templateUrl: './test-course-add.component.html',
  styleUrl: './test-course-add.component.css'
})
export class TestCourseAddComponent {
    
  addTestForm!: FormGroup;
  activeIndex: number = 0;
  items: any;
  courseList : any;

  charCount: number = 0; // Initialize character count

  constructor(private fb: FormBuilder) {
    this.addTestForm = this.fb.group({
      name: [''],
      price: [''],
      isFree: [false],
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

 

  // addTestForm: FormGroup;
  

  
 
}
