import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ ReactiveFormsModule, InputTextModule, ToastModule, KeyFilterModule, InputNumberModule, ToastModule, SkeletonModule, EditorModule, TableModule, ButtonModule ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  faqForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   
  }

  ngOnInit(): void {

    this.faqForm = this.fb.group({
      faq: this.fb.array([])
    });
    // Optionally add an initial FAQ row
    if (this.faq.length === 0) {
      this.addFAQ();
    }
  }

  // Getter for the FormArray
  get faq(): FormArray {
    return this.faqForm.get('faq') as FormArray;
  }

  // Method to create a new FAQ group
  createFAQ(): FormGroup {
    return this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });
  }

  // Method to add a new FAQ row
  addFAQ(): void {
    this.faq.push(this.createFAQ());
  }

  // Method to remove an FAQ row by index
  removeFAQ(index: number): void {
    this.faq.removeAt(index);
  }

  // Submit handler
  onSubmit(): void {
   
      console.log(this.faqForm.value, 'Form is invalid');
    
  }

  trackByIndex(index: number): number {
    return index;
  }

}
