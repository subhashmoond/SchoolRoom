import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {

}
