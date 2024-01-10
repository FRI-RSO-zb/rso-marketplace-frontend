import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PipelinesService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.loaderAgentApi + '/pipelines';

    constructor(private http: HttpClient) {}

    exportSiteToCatalog(site: string): Observable<string> {
        return this.http
            .post<string>(this.url + '/export/site/' + site + '/to/catalog', '', { headers: this.headers })
            .pipe(catchError(this.handleError<string>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
