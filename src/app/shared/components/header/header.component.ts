import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { BingMapsService } from '../../services/bing-maps.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AutoCompleteModule, ReactiveFormsModule, InputTextModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: any[] | undefined;
  value!: string;

  selectedItem: any;

  suggestions: any[] | undefined;
  togglesidebar:any


constructor(public _sharedService:SharedService){}

ngOnInit(): void {
  this._sharedService.toggleButtonValue$.subscribe(value => {
    this.togglesidebar = value;
  });
}


  search(event: AutoCompleteCompleteEvent) {
  }
  openMenu(){
    this.togglesidebar = !this.togglesidebar
    this._sharedService.settoggleButtonValue(this.togglesidebar);
  }

  

}
