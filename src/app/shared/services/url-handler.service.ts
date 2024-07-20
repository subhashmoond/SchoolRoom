import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHandlerService {

  storeUrl : string | null = null;

  constructor() { }

  setStoreUrl(url: string): void {
    this.storeUrl = url;
  }

  getStoreUrl(): string | null {
    return this.storeUrl;
  }

  clearStoreUrl(): void {
    this.storeUrl = null;
  }


}
