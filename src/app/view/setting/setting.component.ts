import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FileUploadModule, CommonModule, ToolbarModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  currentActiveTab: any = 'theme';

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this._sharedService.settoggleButtonValue(false);
  }

  courseTabs(type: any) {
    this.currentActiveTab = type;
  }


}
