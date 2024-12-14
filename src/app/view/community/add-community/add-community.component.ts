import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { CommunityService } from '../../../core/services/community.service';

@Component({
  selector: 'app-add-community',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, ToastModule, KeyFilterModule, InputNumberModule, ToastModule, SkeletonModule, EditorModule],
  providers: [MessageService],
  templateUrl: './add-community.component.html',
  styleUrl: './add-community.component.css'
})
export class AddCommunityComponent {

  addCommunityFrom!: FormGroup
  isLoader: boolean = false
  InstituteId : any

  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _communityService  : CommunityService) {
    const id : any = localStorage.getItem('userData')
    this.InstituteId = JSON.parse(id)
   }

  ngOnInit() {

    console.log(this.InstituteId, "InstituteId InstituteIdInstituteId")

    this.addCommunityFrom = this._fb.group({
      text: ['', Validators.required]
    })


  }


  saveCommunity() {

    const payload = {
      "name": this.addCommunityFrom.get('text')?.value
    }

    this._communityService.addCommunity(this.InstituteId.institute_id, payload).subscribe(res => {

    })

  }

}
