import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ExamCategoryService } from '../../../../core/services/exam-category.service';

@Component({
  selector: 'app-add-digital-product-category',
  standalone: true,
  imports: [ToastModule, InputTextModule, ButtonModule, SidebarModule, TranslateModule,
    ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './add-digital-product-category.component.html',
  styleUrl: './add-digital-product-category.component.css'
})
export class AddDigitalProductCategoryComponent {


  
    createCategoryForm!: FormGroup;
    @Input() editDigitalCategoryData :any;
    @Output() closeSideBars = new EventEmitter<any>();

  
    isEdit : boolean = false
  
    constructor(private _fb: FormBuilder, private _messageService: MessageService, private _examCategory : ExamCategoryService) { }
  
  
    ngOnInit() {

      
  
      this.createCategoryForm = this._fb.group({
        name: ['', Validators.required]
      })


      if(this.editDigitalCategoryData){
        this.isEdit = true;

        this.createCategoryForm.patchValue({
          name: this.editDigitalCategoryData.name
        })

      }
  
    }
  
  
    sameExamCategory() {
  
      // this._messageService.add({ severity: 'success', detail: res.message });
  
      const payload = {
        "name": this.createCategoryForm.get('name')?.value
      }

      if(this.isEdit){

        this._examCategory.editDigitalProdcutCategory(this.editDigitalCategoryData.id, payload).subscribe((res : any) => {
          if(res.status === true){
            this.closeSideBars.emit(res)
            // this._messageService.add({ severity: 'success', detail: res.message });
          }else{
            this._messageService.add({ severity: 'error', detail: res.message });
          }
    
        })

      }
      else{

        this._examCategory.addDigitalProduct(payload).subscribe((res : any) => {
          if(res.status === true){
            this.closeSideBars.emit(res)
            // this._messageService.add({ severity: 'success', detail: res.message });
          }else{
            this._messageService.add({ severity: 'error', detail: res.message });
          }
    
        })

      }
      
  
    }
  
    closeSideBar() { 
      this.closeSideBars.emit('res')
    }

}
