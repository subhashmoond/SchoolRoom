import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { MemberComponent } from './member/member.component';
import { CommunityService } from '../../../core/services/community.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, AvatarModule, SidebarModule, MemberComponent, ToastModule],
  providers: [MessageService],

  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  @Input() groupData: any

  isToggle: boolean = false;
  isMember: boolean = false

  constructor(private _communityService: CommunityService, private _messageService: MessageService) { }

  ngOnInit() {

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

}
