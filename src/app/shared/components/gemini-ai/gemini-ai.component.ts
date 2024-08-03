import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GeminiAiService } from '../../services/gemini-ai.service';

@Component({
  selector: 'app-gemini-ai',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './gemini-ai.component.html',
  styleUrl: './gemini-ai.component.css'
})
export class GeminiAiComponent {

  title = 'gemini-inte';

  prompt: string = '';

  loading: boolean = false;

  chatHistory: any[] = [];

  constructor(private geminiService : GeminiAiService) {
    this.geminiService.getMessageHistory().subscribe((res : any) => {
      if(res) {
        console.log(res,"gemini response")
        this.chatHistory.push(res);
      }
    })
  }

  ngOnInit(){
    this.prompt = 'Angular Developer Subject List'
    this.sendData();
  }

  async sendData() {
    if(this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }


}
