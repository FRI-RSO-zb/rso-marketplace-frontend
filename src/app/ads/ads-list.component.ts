import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad';
import { CarModel } from '../models/carModel';
import { CarBrand } from '../models/carBrand';
import { ModelsService } from '../services/models.service';
import { BrandsService } from '../services/brands.service';

@Component({
    moduleId: module.id,
    selector: 'ads-list',
    templateUrl: 'ads-list.component.html',
})
export class AdsListComponent implements OnInit {
    items: Ad[];
    filters: any;
    ordering: any = '';
    models: Map<number, CarModel> = new Map<number, CarModel>();
    brands: Map<number, CarBrand> = new Map<number, CarBrand>();

    constructor(
        private adsService: AdsService,
        private modelsService: ModelsService,
        private brandsService: BrandsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.filters = {
            sources: {
                marketplace: true,
                avtonet: true,
                bolha: true,
                doberavto: true,
                oglasisi: true,
                salomon: true,
            },
            limit: 10,
            offset: 0,
        };

        this.getList();
    }

    updateSource(source: string, value: boolean) {
        console.log(source);
        console.log(value);
        this.filters.sources[source] = value;
        console.log(this.filters);
        this.getList();
    }

    changeOrdering(ordering: string) {
        this.ordering = ordering;
        this.getList();
    }

    getQuery() {
        let sources: string[] = [];
        if (this.filters.sources.marketplace) {
            sources.push('marketplace');
        }
        if (this.filters.sources.avtonet) {
            sources.push('avtonet');
        }
        if (this.filters.sources.doberavto) {
            sources.push('doberavto');
        }
        if (this.filters.sources.bolha) {
            sources.push('bolha');
        }
        if (this.filters.sources.oglasisi) {
            sources.push('oglasisi');
        }
        if (this.filters.sources.salomon) {
            sources.push('salomon');
        }

        let where = `source:in:[${sources.join(',')}]`;
        return `?limit=${this.filters.limit}&offset=${this.filters.offset}&where=${where}&order=${this.ordering}`;
    }

    getList(): void {
        this.adsService.getList(this.getQuery()).subscribe((items) => {
            this.items = items;

            for (let item of items) {
                if (item.otherData) {
                    try {
                        item._otherData = JSON.parse(item.otherData);
                    } catch {}
                }
                if (item.sourceId) {
                    if (item.source == 'doberavto') {
                        item.originalUri =
                            'https://www.doberavto.si/oglas/' + item.sourceId;
                    }
                    if (item.source == 'oglasisi') {
                        item.photoUri = 'https://oglasi.si/' + item.photoUri;
                    }
                }
            }

            // console.log(items);
            this.loadModels(items);
        });
    }

    loadModels(newItems: Ad[]) {
        let ids = newItems
            .map((x) => x.modelId)
            .filter((i) => !this.models.has(i));
        this.modelsService
            .getList('?' + ids.map((i) => 'ids=' + i).join('&'))
            .subscribe((models) => {
                for (let model of models) {
                    this.models.set(model.id, model);
                }

                this.loadBrands();
            });
    }

    loadBrands() {
        let ids = Array.from(this.models.values())
            .map((x) => x.brandId)
            .filter((i) => !this.brands.has(i));
        if (ids.length > 0) {
            this.brandsService
                .getList('?' + ids.map((i) => 'ids=' + i).join('&'))
                .subscribe((brands) => {
                    for (let brand of brands) {
                        this.brands.set(brand.id, brand);
                    }
                });
        }
    }

    openDetails(item: Ad): void {
        console.log(item);
        this.router.navigate(['/ads/', item.id]);
    }

    delete(item: Ad): void {
        this.adsService.delete(item.id).subscribe(() => {
            this.getList();
        });
    }

    create(): void {
        this.router.navigate(['/ads/create']);
    }
}
