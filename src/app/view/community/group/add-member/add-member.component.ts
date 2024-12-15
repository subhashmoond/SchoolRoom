import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../../../core/services/user.service';
import { ButtonModule } from 'primeng/button';
import { CommunityService } from '../../../../core/services/community.service';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [CheckboxModule, FormsModule, ButtonModule ],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  @Input() groupData : any;
  @Output() closePopup = new EventEmitter<any>();
  seletedStudent : any;
  studentList : any;
 
  constructor( private _userService : UserService, private _communityService : CommunityService ){}

  ngOnInit(){
    this._userService.getStudentData().subscribe(res => {
      this.studentList = res.studentList
    })
  }

  saveMember(){
    console.log(this.groupData, "seleted student lists ")

    const payload = {
      "userIds": this.seletedStudent
    }

    this._communityService.addMemberInGroup(this.groupData.id, payload).subscribe((res : any) => {

      if(res.status === true){
        this.closePopup.emit(res.message)
      }

    })
    

  }

}
