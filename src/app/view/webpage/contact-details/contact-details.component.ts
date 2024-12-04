import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { WebsiteService } from '../../../core/services/website.service';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, ToastModule, KeyFilterModule, InputNumberModule, ToastModule, SkeletonModule ],
  providers : [MessageService],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {

  contactDetail!: FormGroup;
  isLoader : boolean = true

  constructor(private _fb: FormBuilder, private _websiteService : WebsiteService, private _messageService : MessageService) { }

  ngOnInit() {

    this.contactDetail = this._fb.group({
      number: ['', [Validators.required]]
    });


    this.getContactDetails()

  }

  getContactDetails(){
    this.isLoader = true;
    this._websiteService.getContactDetails().subscribe(res=> {
      this.isLoader = false;

      this.contactDetail.setValue({
        number : res.phoneNumber
      })

    })

  }

  saveContactDetails() {
    const payload = {
      "phoneNumber": this.contactDetail.get('number')?.value
    }

    this._websiteService.addContactDetails(payload).subscribe((res:any) => {
      if(res.status){
        this._messageService.add({ severity: 'success', detail: res.message });
      }else{
        this._messageService.add({ severity: 'success', detail: res.message });
      }
    })


  }



}
