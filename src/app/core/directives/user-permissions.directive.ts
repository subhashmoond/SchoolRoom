import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUserPermissions]',
  standalone: true
})
export class UserPermissionsDirective implements OnInit {

  @Input() accessType: string | undefined = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    
    const storedData = localStorage.getItem('userPermissions');
    const userPermissions: any[] = storedData ? JSON.parse(storedData) : [];

    const grantedPermissions = userPermissions.map(permission => permission.family.trim()); // Trim spaces

    if (!this.accessType || !grantedPermissions.includes(this.accessType.trim())) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }
}
