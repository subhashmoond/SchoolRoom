import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { WebsiteService } from '../../../core/services/website.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, ToastModule, KeyFilterModule, InputNumberModule, ToastModule, SkeletonModule, EditorModule ],
  providers : [MessageService],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {

  policyDetailForm!: FormGroup;
  isLoader : boolean = false

  constructor(private _fb: FormBuilder, private _websiteService : WebsiteService, private _messageService : MessageService) { }

  ngOnInit() {

    this.policyDetailForm = this._fb.group({
      text: ['', [Validators.required]]
    });

    this.getAboutDetails()

  }

  getAboutDetails(){
    // this.isLoader = true
    this._websiteService.getPolicyDetails().subscribe(res => {
    this.isLoader = false

    this.policyDetailForm.setValue({
      text : res.text
    })

    })

  }

  savePolicyDetails(){

    const payload = {
      "text" : this.policyDetailForm.get('text')?.value
    }

    this._websiteService.addPolicyDetails(payload).subscribe((res:any) => {

      if(res.status){
        this._messageService.add({ severity: 'success', detail: res.message });
      }else{
        this._messageService.add({ severity: 'success', detail: res.message });
      }

    })

  }

}
