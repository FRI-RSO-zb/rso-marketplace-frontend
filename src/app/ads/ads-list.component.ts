import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';
import { ListWithTotalCount } from '../models/listWithTotalCount';

@Component({
    moduleId: module.id,
    selector: 'ads-list',
    templateUrl: 'ads-list.component.html',
})
export class AdsListComponent implements OnInit {
    ads: ListWithTotalCount<Ad>;
    filters: any;
    sorting: any;

    constructor(private adsService: AdsService, private router: Router) {}

    ngOnInit(): void {
        this.getAdsList();
    }

    getAdsList(): void {
        this.adsService.getAdsList('?limit=50').subscribe((ads) => {
            (this.ads = ads);
            console.log(ads);
        });
    }

    adDetails(ad: Ad): void {
        // this.seznam = seznam;
        // this.router.navigate(['/seznami', this.seznam.id]);
    }

    delete(ad: Ad): void {
        // this.seznamiService
        //     .delete(seznam.id)
        //     .subscribe(
        //         (seznamId) =>
        //             (this.seznami = this.seznami.filter(
        //                 (s) => s.id !== seznamId
        //             ))
        //     );
    }
}
