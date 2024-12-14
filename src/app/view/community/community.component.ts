import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CommunityService } from '../../core/services/community.service';
import { AddCommunityComponent } from './add-community/add-community.component';
import { GroupComponent } from './group/group.component';
import { TooltipModule } from 'primeng/tooltip';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, AccordionModule, AddCommunityComponent, GroupComponent, TooltipModule, AddGroupComponent, DialogModule, ToastModule],
  providers: [MessageService],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {

  currentActiveTab: any = 'theme';
  communitysList : any;
  isAddGroup : boolean = false;
  communityId : any;
  groupData: any

  constructor(private _sharedService: SharedService, private _communityService : CommunityService, private _messageService: MessageService,) { }

  ngOnInit() {
    this._sharedService.settoggleButtonValue(false);
    this.getCommunitContent();
  }

  getCommunitContent(){
    this._communityService.getCommunityContent().subscribe(res => {
      if(res.status === true){
        this.communitysList = res.data
      }
    })
  }

  

  communitySetting(type : any){
    this.currentActiveTab = type;
  }

  courseTabs(type: any) {
    this.currentActiveTab = type;
  }

  addCommunity(type : any){
    this.currentActiveTab = type;

  }

  groupDetail(groupData :any, type : any){
    this.currentActiveTab = type;
    this.groupData = groupData
  }

  addGroups(data : any){
    this.isAddGroup = true;
    this.communityId = data.id
  }

  closePopup(event : any){
    this.isAddGroup = event;
    this._messageService.add({ severity: 'success', detail: 'Group added successfully.' });
  }


}
