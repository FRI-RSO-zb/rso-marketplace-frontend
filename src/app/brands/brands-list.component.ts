import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';
import { ListWithTotalCount } from '../models/listWithTotalCount';
import { Seller } from '../models/seller';
import { SellersService } from '../services/sellers.service';
import { CarBrand } from '../models/carBrand';
import { BrandsService } from '../services/brands.service';

@Component({
    moduleId: module.id,
    selector: 'brands-list',
    templateUrl: 'brands-list.component.html',
})
export class BrandsListComponent implements OnInit {
    // items: ListWithTotalCount<Ad>;
    items: CarBrand[];
    filters: any;
    sorting: any;

    constructor(private brandsService: BrandsService, private router: Router) {}

    ngOnInit(): void {
        this.getList();
    }

    getList(): void {
        this.brandsService.getList('?limit=50').subscribe((items) => {
            (this.items = items);
            // console.log(items);
        });
    }

    openDetails(item: Ad): void {
        // this.router.navigate(['/ads', item.id]);
    }

    delete(item: Ad): void {
        this.brandsService
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
        this.router.navigate(['/brands/create']);
    }
}
