import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdsListComponent } from './ads/ads-list.component';
import { AdsService } from './services/ads.service';
import { CreateAdComponent } from './ads/create-ad.component';
import { BrandsService } from './services/brands.service';
import { ModelsService } from './services/models.service';
import { SellersService } from './services/sellers.service';
import { DebugComponent } from './debug/debug.component';
import { SellersListComponent } from './sellers/sellers-list.component';
import { CreateSellerComponent } from './sellers/create-seller.component';
import { EditAdComponent } from './ads/edit-ad.component';
import { BrandsListComponent } from './brands/brands-list.component';
import { CreateBrandComponent } from './brands/create-brand.component';
import { EditBrandComponent } from './brands/edit-brand.component';
import { AdminComponent } from './admin/admin.component';
import { LoadersService } from './services/loaders.service';
import { PipelinesService } from './services/pipelines.service';
import { ProcessorsService } from './services/processors.service';

@NgModule({
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
    declarations: [
        AppComponent,
        AdsListComponent,
        CreateAdComponent,
        EditAdComponent,
        SellersListComponent,
        CreateSellerComponent,
        BrandsListComponent,
        CreateBrandComponent,
        EditBrandComponent,
        DebugComponent,
        AdminComponent,
    ],
    providers: [
        AdsService,
        BrandsService,
        ModelsService,
        SellersService,
        LoadersService,
        PipelinesService,
        ProcessorsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
