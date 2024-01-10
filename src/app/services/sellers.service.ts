import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { Observable, catchError, map } from 'rxjs';
import { CarBrand } from '../models/carBrand';
import { CarModel } from '../models/carModel';
import { Seller } from '../models/seller';
import { environment } from '../../environments/environment';

@Injectable()
export class SellersService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.catalogApi + '/sellers';

    constructor(private http: HttpClient) {}

    getList(query: string = ''): Observable<Seller[]> {
        return this.http
            .get<Seller[]>(this.url + query)
            .pipe(catchError(this.handleError<Seller[]>));
    }

    getById(id: number): Observable<Seller> {
        return this.http.get<Seller>(this.url + '/' + id);
    }

    delete(id: number): Observable<any> {
        return this.http
            .delete(this.url + '/' + id, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    create(item: Seller[]): Observable<Seller[]> {
        return this.http
            .post<Seller[]>(this.url, JSON.stringify(item), { headers: this.headers })
            .pipe(catchError(this.handleError<Seller[]>));
    }

    update(id: number, item: Seller): Observable<Seller> {
        return this.http
            .put<Seller>(this.url + '/' + id, JSON.stringify(item), {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError<Seller>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
