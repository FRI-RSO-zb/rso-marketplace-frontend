import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AdsService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.catalogApi + '/ads';

    constructor(private http: HttpClient) {}

    getList(query: string = ''): Observable<Ad[]> {
        // return this.http.get<Ad[]>(this.url).pipe(catchError(this.handleError));

        return this.http
            .get<Ad[]>(this.url + query)
            .pipe(catchError(this.handleError<Ad[]>));

        // .get<HttpResponse<Ad[]>>(this.url + query, { observe: 'response' })
        // .pipe(
        //     map((response) => {
        //         console.log(response);
        //         let x: any = response.body; // Bug that required to call .body twice??
        //         return new ListWithTotalCount<Ad>(
        //             x ?? [],
        //             x.length
        //             /*parseInt(response.headers.get("X-Total-Count") ?? '0')*/
        //         );
        //     })
        //     // catchError(this.handleError)
        // );
    }

    getById(id: number): Observable<Ad> {
        return this.http.get<Ad>(this.url + '/' + id);
    }

    getBySeller(sellerId: number): Observable<Ad[]> {
        return this.http
            .get<Ad[]>(this.url + '/by-seller/' + sellerId)
            .pipe(catchError(this.handleError<Ad[]>));
    }

    delete(id: number): Observable<any> {
        return this.http
            .delete(this.url + '/' + id, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    create(item: Ad[]): Observable<Ad[]> {
        return this.http
            .post<Ad[]>(this.url, JSON.stringify(item), { headers: this.headers })
            .pipe(catchError(this.handleError<Ad[]>));
    }

    update(id: number, item: Ad): Observable<Ad> {
        return this.http
            .put<Ad>(this.url + '/' + id, JSON.stringify(item), {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError<Ad>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
