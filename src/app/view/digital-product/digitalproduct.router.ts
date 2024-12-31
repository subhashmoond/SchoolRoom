import { Routes } from '@angular/router';
import { DigitalProductComponent } from './digital-product.component';
import { DigitalProductDetailComponent } from './digital-product-detail/digital-product-detail.component';

export const routes: Routes = [
    { path: '', component: DigitalProductComponent },
    {path: 'detail/:id', component : DigitalProductDetailComponent}
];

