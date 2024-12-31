import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AddTeamComponent } from '../../user/team/add-team/add-team.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MarketingService } from '../../../core/services/marketing.service';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, ToggleButtonModule],
  providers: [MessageService],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css'
})
export class ReferralComponent {


  referralSettingForm!: FormGroup;
  walletDatas: any

  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _marketingService: MarketingService) { }

  ngOnInit() {

    this.referralSettingForm = this._fb.group({
      referralStatus: [true],
      signupreferrer: [0],
      signupreferee: [0],
      transactionreferrer: [0],
      transactionreferee: [0],
      maxreferral: [0]
    });

    this.getReferralData()

  }

  getReferralData() {
    this._marketingService.getReferralData().subscribe(res => {

      this.referralSettingForm.patchValue({
        referralStatus: res.isreferralAllowed,
        signupreferrer: res.singup_referrer,
        signupreferee: res.singup_referee,
        transactionreferrer: res.transaction_referrer,
        transactionreferee: res.transaction_referee,
        maxreferral: res.max_referral_count
      });

    });
  }

  submit() {

    const payload = {
      "isreferralAllowed": this.referralSettingForm.get('referralStatus')?.value,
      "newSignup_referrer": this.referralSettingForm.get('signupreferrer')?.value,
      "newSignup_referee": this.referralSettingForm.get('signupreferee')?.value,
      "firstTransaction_referrer": this.referralSettingForm.get('transactionreferrer')?.value,
      "firstTransaction_referee": this.referralSettingForm.get('transactionreferee')?.value,
      "maxReferralCount": this.referralSettingForm.get('maxreferral')?.value
    }

    this._marketingService.updateReferralCode(payload).subscribe((res: any) => {
      if (res.status === true) {
        this._messageService.add({ severity: 'success', detail: "Referral Code updated successfully!" });
        this.getReferralData()
      }
    })

  }

}
