import { Component, OnInit } from "@angular/core";
import { PipelinesService } from "../services/pipelines.service";
import { LoadersService } from "../services/loaders.service";

@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'admin.component.html',
})
export class AdminComponent implements OnInit {
    importLog = '';
    sources: string[] = [];
    source: string;

    constructor(private pipelinesService: PipelinesService, private loadersService: LoadersService) {

    }

    ngOnInit(): void {
        this.loadersService.getAll().subscribe((items) => {
            this.sources = items;
        });
    }

    startImport() {
        console.log(this.source)
        if (!this.source) {
            return;
        }
        console.log('starting import')

        this.pipelinesService.exportSiteToCatalog(this.source).subscribe((result) => {
            console.log(result);
            this.importLog = result;
        })
    }

    sourceSelected(source: string) {
        console.log(source)
    }
}
