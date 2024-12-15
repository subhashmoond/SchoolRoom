import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { MemberComponent } from './member/member.component';
import { CommunityService } from '../../../core/services/community.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddMemberComponent } from "./add-member/add-member.component";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, AvatarModule, SidebarModule, MemberComponent, ToastModule, DialogModule, AddGroupComponent, AddMemberComponent],
  providers: [MessageService],

  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  @Input() groupData: any;
  @Input() communityId: any;

  isToggle: boolean = false;
  isMember: boolean = false;
  isEditGroup: boolean = false;
  isAddMember: boolean = false;
  editGroupData: any;
  groupDatas : any

  constructor(private _communityService: CommunityService, private _messageService: MessageService) { }

  ngOnInit() {
    this.getGroupData();
  }

  getGroupData(){
    this._communityService.getGroupById(this.groupData.id).subscribe(res=> {
      this.groupDatas = res
    })
  }

  toggleDropdown() {
    this.isToggle = !this.isToggle
  }

  memberSideBar() {
    this.isMember = true
  }

  deleteGroup(id: any) {
    this._communityService.deleteGroup(id).subscribe((res: any) => {
      if (res.status === true) {
        this._messageService.add({ severity: 'success', detail: res.message });
      }
    })
  }

  editGroup(data: any) {
    this.isEditGroup = true;
    this.editGroupData = data
  }

  addMemberSideBar(id: number) {
    this.isAddMember = true
  }

  closePopup(event: any) {
    this.getGroupData();
    this.isEditGroup = false;
    this._messageService.add({ severity: 'success', detail: 'Group updated successfully.' });
  }

  closeMemberPopup(event : any){
    this.isAddMember = false
    this._messageService.add({ severity: 'success', detail: event });
  }

}
