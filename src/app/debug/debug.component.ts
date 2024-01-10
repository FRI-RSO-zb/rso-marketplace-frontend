import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Info } from '../models/info';
import { env } from 'process';

// import {SeznamiService} from './services/seznami.service';
// import { Artikel } from './models/artikel';
// import { switchMap } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    selector: 'debug',
    templateUrl: 'debug.component.html',
})
export class DebugComponent {
    catalogUrl = environment.catalogApi + '/info';
    loaderUrl = environment.loaderAgentApi + '/info';

    catalogInfo: Info;
    loaderInfo: Info;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get<Info>(this.catalogUrl).subscribe((info) => {
            this.catalogInfo = info;
        });
        this.http.get<Info>(this.loaderUrl).subscribe((info) => {
            this.loaderInfo = info;
        });
    }

    breakCatalog() {
        this.http.post(environment.catalogApi + '/debug/break', '').subscribe();
    }

    breakLoader() {
        this.http.post(environment.loaderAgentApi + '/debug/break', '').subscribe();
    }
}
