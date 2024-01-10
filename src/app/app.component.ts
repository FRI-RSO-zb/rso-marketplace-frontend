import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'marketplace-app',
    template: `
        <h1>{{ title }}</h1>
        <div class="navigation">
            <a [routerLink]="['/ads']">Oglasi</a>
            <a [routerLink]="['/sellers']">Prodajalci</a>
            <a [routerLink]="['/brands']">Znamke</a>
            <a [routerLink]="['/admin']">Admin</a>
            <a [routerLink]="['/debug']">Debug</a>
        </div>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    title = 'Marketplace';
}
