import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedService } from '../../shared/services/shared.service';
import { SocialMediaComponent } from "./social-media/social-media.component";
import { ThemeComponent } from './theme/theme.component';
import { DomainComponent } from './domain/domain.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'app-webpage',
  standalone: true,
  imports: [FileUploadModule, CommonModule, ToolbarModule, SocialMediaComponent,
    ThemeComponent, DomainComponent, ContactDetailsComponent, AboutPageComponent, PrivacyPolicyComponent, FaqComponent
  ],
  templateUrl: './webpage.component.html',
  styleUrl: './webpage.component.css'
})
export class WebpageComponent {

  currentActiveTab : any = 'theme';

  constructor(private _sharedService : SharedService){}

ngOnInit(){
  this._sharedService.settoggleButtonValue(false);
}

  courseTabs(type : any){
    this.currentActiveTab = type;
  }

}
