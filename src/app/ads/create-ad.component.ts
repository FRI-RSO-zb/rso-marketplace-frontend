import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';
import { BrandsService } from '../services/brands.service';
import { CarBrand } from '../models/carBrand';
import { CarModel } from '../models/carModel';
import { SellersService } from '../services/sellers.service';
import { Seller } from '../models/seller';

@Component({
    moduleId: module.id,
    selector: 'create-ad',
    templateUrl: 'create-ad.component.html',
})
export class CreateAdComponent {
    item: Ad = new Ad();
    sellers: Seller[];
    brands: CarBrand[];
    models: CarModel[];

    constructor(
        private adsService: AdsService,
        private brandsService: BrandsService,
        private sellersService: SellersService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.brandsService
            .getList('?limit=50')
            .subscribe((brands) => (this.brands = brands));
        this.sellersService
            .getList('?limit=50')
            .subscribe((sellers) => (this.sellers = sellers));
    }

    sellerSelected(id: number) {
        this.item.sellerId = id;
    }

    brandSelected(id: number) {
        console.log(id);

        this.item.modelId = null;
        this.models = null;
        this.brandsService
            .getModels(id)
            .subscribe((models) => (this.models = models));
    }

    modelSelected(id: number) {
        this.item.modelId = id;
    }

    submitForm(): void {
        this.adsService
            .create([this.item])
            .subscribe(() => this.router.navigate(['/ads']));
    }
}
