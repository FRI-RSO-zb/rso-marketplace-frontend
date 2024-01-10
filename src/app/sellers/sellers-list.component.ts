import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';
import { ListWithTotalCount } from '../models/listWithTotalCount';
import { Seller } from '../models/seller';
import { SellersService } from '../services/sellers.service';

@Component({
    moduleId: module.id,
    selector: 'sellers-list',
    templateUrl: 'sellers-list.component.html',
})
export class SellersListComponent implements OnInit {
    // items: ListWithTotalCount<Ad>;
    items: Seller[];
    filters: any;
    sorting: any;

    constructor(private sellersService: SellersService, private router: Router) {}

    ngOnInit(): void {
        this.getList();
    }

    getList(): void {
        this.sellersService.getList('?limit=50').subscribe((items) => {
            (this.items = items);
            // console.log(items);
        });
    }

    openDetails(item: Ad): void {
        // this.router.navigate(['/ads', item.id]);
    }

    delete(item: Ad): void {
        this.sellersService
            .delete(item.id)
            .subscribe(
                () => {
                    this.getList();
                }
            )
        // this.seznamiService
        //     .delete(seznam.id)
        //     .subscribe(
        //         (seznamId) =>
        //             (this.seznami = this.seznami.filter(
        //                 (s) => s.id !== seznamId
        //             ))
        //     );
    }

    create(): void {
        this.router.navigate(['/sellers/create']);
    }
}
