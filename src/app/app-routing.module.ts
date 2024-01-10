import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdsListComponent } from './ads/ads-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/ads', pathMatch: 'full' },
    { path: 'ads', component: AdsListComponent },
    // {path: 'ads/:id', component: SeznamPodrobnostiComponent},
    // {path: 'ads/:id/create', component: ArtikelDodajComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
