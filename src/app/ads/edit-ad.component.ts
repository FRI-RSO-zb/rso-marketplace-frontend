import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';
import { BrandsService } from '../services/brands.service';
import { CarBrand } from '../models/carBrand';
import { CarModel } from '../models/carModel';
import { ModelsService } from '../services/models.service';
import { SellersService } from '../services/sellers.service';
import { Seller } from '../models/seller';

@Component({
    moduleId: module.id,
    selector: 'edit-ad',
    templateUrl: 'edit-ad.component.html',
})
export class EditAdComponent {
    itemId: number;
    item: Ad;
    sellers: Seller[];
    brands: CarBrand[];
    models: CarModel[];

    brandId: number;

    constructor(
        private adsService: AdsService,
        private brandsService: BrandsService,
        private modelsService: ModelsService,
        private sellersService: SellersService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.itemId = +params['id'];
            this.loadItem();
        });
        
        this.brandsService.getList('?limit=50').subscribe((brands) => {
            this.brands = brands;
        });
    }

    loadItem() {
        this.adsService
            .getById(this.itemId)
            .subscribe((item) => {
                this.item = item;
            this.modelsService.getById(this.item.modelId).subscribe((model) => {
                this.brandId = model.brandId;
                this.brandSelected(this.brandId);
                this.modelSelected(model.id);
            });
            this.sellersService
                .getList('?limit=50')
                .subscribe((sellers) => (this.sellers = sellers));
        });
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
            .update(this.item.id, this.item)
            .subscribe(() => this.router.navigate(['/ads']));
    }
}
