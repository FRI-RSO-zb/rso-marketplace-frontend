import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LoadersService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.loaderAgentApi + '/loaders';

    constructor(private http: HttpClient) {}

    getAll(): Observable<string[]> {
        return this.http
            .get<string[]>(this.url)
            .pipe(catchError(this.handleError<string[]>));
    }

    getLoaderPages(loader: string): Observable<string[]> {
        return this.http
            .get<string[]>(this.url + '/' + loader + '/pages')
            .pipe(catchError(this.handleError<string[]>));
    }

    loadPage(loader: string, page: string): Observable<string> {
        return this.http
            .post<string>(this.url + '/' + loader + '/' + page + '/load', '', { headers: this.headers })
            .pipe(catchError(this.handleError<string>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
