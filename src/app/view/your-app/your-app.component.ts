import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedService } from '../../shared/services/shared.service';
import { ConfigurationComponent } from './configuration/configuration.component';

@Component({
  selector: 'app-your-app',
  standalone: true,
  imports: [ CommonModule, ToolbarModule, ConfigurationComponent ],
  templateUrl: './your-app.component.html',
  styleUrl: './your-app.component.css'
})
export class YourAppComponent {

  currentActiveTab : any = 'Configuration';
  
    constructor(private _sharedService : SharedService){}
  
  ngOnInit(){
    this._sharedService.settoggleButtonValue(false);
  }
  
    courseTabs(type : any){
      this.currentActiveTab = type;
    }

}
