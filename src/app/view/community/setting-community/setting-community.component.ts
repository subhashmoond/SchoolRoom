import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommunityService } from '../../../core/services/community.service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AddCommunityComponent } from "../add-community/add-community.component";
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-setting-community',
  standalone: true,
  imports: [DialogModule, ToastModule, AddCommunityComponent, ToastModule, SkeletonModule ],
  providers : [MessageService],
  templateUrl: './setting-community.component.html',
  styleUrl: './setting-community.component.css'
})
export class SettingCommunityComponent {

  communitysList : any;
  isEditCommunity : boolean = false;
  communityData : any;
  isLoader : boolean = false

  constructor( private _communityService : CommunityService, private _messageService: MessageService,) { }

  ngOnInit(){
    this.getCommunitContent()
  }

  getCommunitContent(){
    this.isLoader = true
    this._communityService.getCommunitysList().subscribe(res => {
      this.isLoader = false
      if(res.status === true){
        this.communitysList = res.data
      }
    })
  }

  editCommunity(data:any){
    this.isEditCommunity = true;
    this.communityData = data
  }

  closePopup(event : any){
    this.isEditCommunity = false;
    this._messageService.add({ severity: 'success', detail: event });
    this.getCommunitContent()
  }

}
