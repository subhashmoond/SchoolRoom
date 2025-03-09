import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../../../core/services/user.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, MultiSelectModule, PasswordModule, InputSwitchModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {
  @Output() sidebar = new EventEmitter<any>()

  sideBar: boolean = true;
  addTeacher!: FormGroup;
  permissionList: any

  groupedCities = [
    {
      label: 'Germany',
      value: 'de',
      items: [
        { label: 'Berlin', value: 'Berlin' },
        { label: 'Frankfurt', value: 'Frankfurt' },
        { label: 'Hamburg', value: 'Hamburg' },
        { label: 'Munich', value: 'Munich' }
      ]
    },
    {
      label: 'USA',
      value: 'us',
      items: [
        { label: 'Chicago', value: 'Chicago' },
        { label: 'Los Angeles', value: 'Los Angeles' },
        { label: 'New York', value: 'New York' },
        { label: 'San Francisco', value: 'San Francisco' }
      ]
    },
    {
      label: 'Japan',
      value: 'jp',
      items: [
        { label: 'Kyoto', value: 'Kyoto' },
        { label: 'Osaka', value: 'Osaka' },
        { label: 'Tokyo', value: 'Tokyo' },
        { label: 'Yokohama', value: 'Yokohama' }
      ]
    }
  ];

  constructor(private _fb: FormBuilder, private _userService: UserService, private messageService: MessageService) {
    // this._userService.getPermissionData().subscribe(res => {
    //   this.permissionList = res.permissions
    // })
  }

  ngOnInit() {
    this.getPermissionList();

    this.addTeacher = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      permissions: ['']
    });





  }

  getPermissionList() {

    this._userService.getPermissionData().subscribe(res => {
      this.permissionList = res.permissions;

      this.permissionList.forEach((module: any) => {
        this.addTeacher.addControl(module.family, this._fb.control(false));
      });

    })

  }

  submitStudent() {
    console.log(this.addTeacher.value, "add teacher form value");

    // Convert true/false values to IDs
    const selectedPermissions = this.permissionList
      .filter((module: any) => this.addTeacher.value[module.family]) // Keep only selected modules
      .map((module: any) => module.id); // Store only the IDs

    console.log("Selected Permission IDs:", selectedPermissions);

    // Prepare teacher data
    const formData = new FormData();
    formData.append('name', this.addTeacher.get('name')?.value);
    formData.append('phone_number', this.addTeacher.get('mobile')?.value);
    formData.append('password', this.addTeacher.get('password')?.value);
    formData.append('email', this.addTeacher.get('email')?.value);

    // Call addTeacher API and chain permissionAssignToTeacher after success
    this._userService.addTeacher(formData).pipe(
      switchMap((res: any) => {
        console.log("Teacher created successfully", res);

        // If response contains teacher_id, use it
        const teacherId = res?._id

        // Prepare permission data
        const assignPermission = new FormData();
        assignPermission.append('teacher_id', teacherId);
        assignPermission.append('permission_ids', JSON.stringify(selectedPermissions)); // Send as JSON string

        // Call permissionAssignToTeacher API
        return this._userService.permissionAssignToTeacher(assignPermission);
      })
    ).subscribe({
      next: () => {
        // this.messageService.add({ severity: 'success', detail: 'Teacher Created & Permissions Assigned Successfully' });
        this.sidebar.emit(true);
      },
      error: (err) => {
        console.error("Error occurred:", err);
        this.messageService.add({ severity: 'error', detail: 'Something went wrong!' });  
      }
    });
  }


  closeButton() {
    this.sidebar.emit(false);
  }

}
