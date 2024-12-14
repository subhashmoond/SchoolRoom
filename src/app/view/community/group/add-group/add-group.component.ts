import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { CommunityService } from '../../../../core/services/community.service';
import { InputSwitchModule } from 'primeng/inputswitch';


@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [DialogModule, ButtonModule, ReactiveFormsModule, InputTextModule, ToastModule, KeyFilterModule, InputNumberModule, ToastModule, SkeletonModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {
  @Input() communityId: any;
  @Output() closePopup = new EventEmitter<any>()

  addGroupFrom!: FormGroup;
  onlyAdminSendChecked: boolean = false;

  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _communityService: CommunityService) {
  }

  ngOnInit() {
    this.addGroupFrom = this._fb.group({
      name: ['', Validators.required],
      describe: ['', Validators.required],
      onlyAdminSend: []
    })
  }

  saveGroup() {

    const payload = {
      "name": this.addGroupFrom.get('name')?.value,
      "describe": this.addGroupFrom.get('describe')?.value,
      "onlyAdminSend": false
    }

    this._communityService.addGroups(this.communityId, payload).subscribe((res:any) => {
      if(res.status === true){
        this.closePopup.emit(false)
      }
    })

  }

}
