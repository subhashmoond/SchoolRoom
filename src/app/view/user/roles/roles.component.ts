import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ToastModule],
  providers : [MessageService],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roleList = [
    {name : 'Admin', Description : 'Has all permissions as the super admin except for managing payment gateways, account upgrade & deletion, and adding admins', 
      Permissions : [
        {name : 'Manage piracy monitor'},
        {name : 'Instructor'},
        {name : 'View Live Class Report'},
        {name : 'Create & Manage System Emails'}
      ],
      count : 12,
    },
    {name : 'Content Admin', Description : 'Has permission to manage products, discussions and review essay questions', 
      Permissions : [
        {name : 'Manage piracy monitor'},
        {name : 'Instructor'},
        {name : 'View Live Class Report'},
        {name : 'Create & Manage System Emails'}
      ],
      count : 20,
    }
  ]

  constructor(private renderer: Renderer2, private _router: Router, private _userService: UserService, private messageService: MessageService) {
  }




}
