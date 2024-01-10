import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdsListComponent } from './ads/ads-list.component';
import { CreateAdComponent } from './ads/create-ad.component';
import { DebugComponent } from './debug/debug.component';
import { SellersListComponent } from './sellers/sellers-list.component';
import { CreateSellerComponent } from './sellers/create-seller.component';
import { EditAdComponent } from './ads/edit-ad.component';
import { BrandsListComponent } from './brands/brands-list.component';
import { CreateBrandComponent } from './brands/create-brand.component';
import { EditBrandComponent } from './brands/edit-brand.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: '', redirectTo: '/ads', pathMatch: 'full' },
    { path: 'ads', component: AdsListComponent },
    { path: 'ads/create', component: CreateAdComponent },
    { path: 'ads/:id', component: EditAdComponent },

    { path: 'sellers', component: SellersListComponent },
    { path: 'sellers/create', component: CreateSellerComponent },

    { path: 'brands', component: BrandsListComponent },
    { path: 'brands/create', component: CreateBrandComponent },
    { path: 'brands/:id', component: EditBrandComponent },

    { path: 'debug', component: DebugComponent },

    { path: 'admin', component: AdminComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
