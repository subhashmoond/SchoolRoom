import { Routes } from '@angular/router';
import { CouponsComponent } from './coupons.component';
import { ReferralComponent } from './referral/referral.component';
import { WalletComponent } from './wallet/wallet.component';

export const routes: Routes = [
    { path: 'coupons', component: CouponsComponent },
    {path : 'referral', component : ReferralComponent},
    {path : 'wallet', component : WalletComponent}
];

