import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUserPermissions]',
  standalone: true
})
export class UserPermissionsDirective {

  @Input() accessType: string = '';
  data: any;
  grantPermissions : any;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  cache: Map<string, boolean> = new Map<string, boolean>();




  ngOnInit(): void {
    let hasAccessType = false;

    this.data = localStorage.getItem('userData')
    this.grantPermissions = JSON.parse(this.data) || []

    if (Array.isArray(this.grantPermissions)) {
      for (const item of this.grantPermissions) {
        if (item.permissions === this.accessType) {
          hasAccessType = true;
          break;
        }
      }
    }

    if (!hasAccessType) {
      const buttonElement = this.elementRef.nativeElement;
      this.elementRef.nativeElement.style.display = 'none'
      // this.renderer.setStyle(buttonElement, 'pointer-events', 'none');
      // this.elementRef.nativeElement.style.opacity = "0.5";
      // this.elementRef.nativeElement.style.cursor = "not-allowed";
    } else {
      // this.elementRef.nativeElement.style.display = 'none'
    }
  }

}
