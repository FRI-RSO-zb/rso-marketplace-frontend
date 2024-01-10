import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';
import { BrandsService } from '../services/brands.service';
import { CarBrand } from '../models/carBrand';
import { CarModel } from '../models/carModel';
import { ModelsService } from '../services/models.service';
import { SellersService } from '../services/sellers.service';

@Component({
    moduleId: module.id,
    selector: 'edit-brand',
    templateUrl: 'edit-brand.component.html',
})
export class EditBrandComponent {
    item: CarBrand = new CarBrand();
    // sellers: Seller[];
    // seznamId: number;
    // brands: CarBrand[];
    // models: CarModel[];

    constructor(
        // private adsService: AdsService,
        private brandsService: BrandsService,
        // private sellersService: SellersService,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // this.brandsService
        //     .getList('?limit=50')
        //     .subscribe((brands) => (this.brands = brands));
        // this.sellersService
        //     .getList('?limit=50')
        //     .subscribe((sellers) => (this.sellers = sellers));
        // this.sub = this.route.params.subscribe(params => {
        //    this.seznamId = +params['id'];
        // });
    }

    // sellerSelected(id: number) {
    //     this.item.sellerId = id;
    // }

    // brandSelected(id: number) {
    //     console.log(id);

    //     this.item.modelId = null;
    //     this.models = null;
    //     this.brandsService
    //         .getModels(id)
    //         .subscribe((models) => (this.models = models));
    // }

    // modelSelected(id: number) {
    //     this.item.modelId = id;
    // }

    submitForm(): void {
        this.brandsService
            .create([this.item])
            .subscribe(() => this.location.back());
    }
}
