import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent {

}
