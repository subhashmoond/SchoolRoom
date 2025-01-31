import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppSettingService } from '../../../core/services/app-setting.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, InputTextModule, RadioButtonModule, FormsModule, CheckboxModule, FileUploadModule, ToastModule ],
  providers: [MessageService],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {

  configurationForm! : FormGroup;
  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  themes = [
    { name: 'blue', color: '#00ADEF' },
    { name: 'red', color: '#F44336' },
    { name: 'orange', color: '#FF9800' },
    { name: 'green', color: '#4CAF50' },
    { name: 'purple', color: '#673AB7' },
    { name: 'pink', color: '#E91E63' },
    { name: 'brown', color: '#8D6E63' }
  ];
  selectedTheme = this.themes[0];

  constructor( private _fb : FormBuilder, private _appSettingService : AppSettingService, private _messageService: MessageService, ){}

  ngOnInit(){

    this.configurationForm = this._fb.group({
      appname : [''],
      splashscreens: this._fb.array([])
    })

    // this.addSplashscreen();

  }


  selectTheme(theme: any) {
    this.selectedTheme = theme;
  }

  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFile = event.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFileObjectUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  profileImageRemove() {
    this.selectedFileObjectUrl = null;
    this.fileUpload.clear();
  }

  // Getter to access FormArray
  get splashscreens(): FormArray {
    return this.configurationForm.get('splashscreens') as FormArray;
  }

  // Create a new FormGroup for splashscreen
  createSplashscreen(): FormGroup {
    return this._fb.group({
      // image: [null], 
      heading: [''],
      subheading: ['']
    });
  }

  // Add new splashscreen
  addSplashscreen(): void {
    this.splashscreens.push(this.createSplashscreen());
  }

  // Remove splashscreen by index
  removeSplashscreen(index: number): void {
    this.splashscreens.removeAt(index);
  }

  onFileSelectWelcome(event: any, index: number): void {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.splashscreens.at(index).patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }


  saveAppSetting(){

    const payload = new FormData()

    payload.append('name', this.configurationForm.get('appname')?.value )
    payload.append('color_theme', this.selectedTheme?.color )
    payload.append('logo', this.selectedFile)

    console.log(payload, "app name")

    this._appSettingService.addAppConfiguration(payload).subscribe(res => {
      this._messageService.add({ severity: 'error', detail: 'res.message' });
    })

  }



}
