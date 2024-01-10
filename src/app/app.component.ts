import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'marketplace-app',
    template: `
        <h1>{{ title }}</h1>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    title = 'Marketplace';
}
