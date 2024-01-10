import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { Observable, catchError, map } from 'rxjs';
import { ListWithTotalCount } from '../models/listWithTotalCount';

@Injectable()
export class AdsService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = 'http://localhost:8801/v1/ads';

    constructor(private http: HttpClient) {}

    getAdsList(query: string = ''): Observable<ListWithTotalCount<Ad>> {
        // return this.http.get<Ad[]>(this.url).pipe(catchError(this.handleError));
        return this.http
            .get<HttpResponse<Ad[]>>(this.url + query, { observe: 'response' })
            .pipe(
                map(response => {
                    console.log(response);
                    let x: any = response.body; // Bug that required to call .body twice??
                    return new ListWithTotalCount<Ad>(
                        (x ?? []),
                        x.length
                        /*parseInt(response.headers.get("X-Total-Count") ?? '0')*/
                    );
                }),
                // catchError(this.handleError)
            );
    }

    // getSeznam(id: number): Observable<NakupovalniSeznam> {
    //     const url = `${this.url}/${id}`;
    //     return this.http
    //         .get<NakupovalniSeznam>(url)
    //         .pipe(catchError(this.handleError));
    // }
    // delete(id: number): Observable<number> {
    //     const url = `${this.url}/${id}`;
    //     return this.http
    //         .delete<number>(url, { headers: this.headers })
    //         .pipe(catchError(this.handleError));
    // }
    // create(seznamId: number, artikel: Artikel): Observable<Artikel> {
    //     return this.http
    //         .post<Artikel>(
    //             this.url + '/' + seznamId + '/artikli',
    //             JSON.stringify(artikel),
    //             { headers: this.headers }
    //         )
    //         .pipe(catchError(this.handleError));
    // }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
