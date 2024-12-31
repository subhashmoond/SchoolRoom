import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MarketingService } from '../../../core/services/marketing.service';


@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, ToggleButtonModule],
  providers: [MessageService],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

  walletSettingForm!: FormGroup;
  walletDatas: any

  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _marketingService: MarketingService) { }

  ngOnInit() {

    this.walletSettingForm = this._fb.group({
      wallatStatus: [true],
      creditvalue: [0],
      currencyname: [0]
    });

    this.getWalletData()

  }

  getWalletData() {
    this._marketingService.getWalletData().subscribe(res => {
      this.walletDatas = res;

      this.walletSettingForm.patchValue({
        wallatStatus: res.isreferralAllowed,
        creditvalue: res.values,
        currencyname: res.virtual_currency_name,
      });

    });
  }

  submit() {

    const payload = {
      "wallet_enble": this.walletSettingForm.get('wallatStatus')?.value,
      "creditValue": this.walletSettingForm.get('creditvalue')?.value,
      "virtualCurrencyName": this.walletSettingForm.get('currencyname')?.value
    }

    this._marketingService.updateWallet(payload).subscribe((res: any) => {
      if (res.status === true) {
        this._messageService.add({ severity: 'success', detail: "Wallet updated successfully!" });
        this.getWalletData()
      }
    })

  }


}
