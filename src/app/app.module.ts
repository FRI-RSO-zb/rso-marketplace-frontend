import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdsListComponent } from './ads/ads-list.component';
import { AdsService } from './services/ads.service';

@NgModule({
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
    declarations: [AppComponent, AdsListComponent],
    providers: [AdsService],
    bootstrap: [AppComponent],
})
export class AppModule {}
