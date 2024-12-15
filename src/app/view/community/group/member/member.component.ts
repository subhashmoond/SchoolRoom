import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CommunityService } from '../../../../core/services/community.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [AvatarModule, ToastModule ],
  providers: [MessageService],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {

  @Input() groupData: any;
  memberData: any;

  constructor(private _communityService: CommunityService,  private _messageService: MessageService) { }

  ngOnInit() {
    this.getAllMember();
  }

  getAllMember(){

    this._communityService.getAllMembers(this.groupData.id).subscribe(res => {
      this.memberData = res.data
    })

  }

  deleteMember(id: any) {
    const payload = {
      "userIds": [id]
    }

    this._communityService.deleteMemberFromGroup(this.groupData.id, payload).subscribe((res : any) => {
      this._messageService.add({ severity: 'success', detail: res.message });
      this.getAllMember();
    })

  }


}
