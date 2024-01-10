import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { Observable, catchError, map } from 'rxjs';
import { CarBrand } from '../models/carBrand';
import { CarModel } from '../models/carModel';
import { environment } from '../../environments/environment';

@Injectable()
export class BrandsService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.catalogApi + '/brands';

    constructor(private http: HttpClient) {}

    getList(query: string = ''): Observable<CarBrand[]> {
        return this.http
            .get<CarBrand[]>(this.url + query)
            .pipe(catchError(this.handleError<CarBrand[]>));
    }

    getById(id: number): Observable<CarBrand> {
        return this.http.get<CarBrand>(this.url + '/' + id);
    }

    getModels(id: number): Observable<CarModel[]> {
        return this.http
            .get<CarModel[]>(this.url + '/' + id + '/models')
            .pipe(catchError(this.handleError<CarModel[]>));
    }

    delete(id: number): Observable<any> {
        return this.http
            .delete(this.url + '/' + id, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    create(item: CarBrand[]): Observable<CarBrand[]> {
        return this.http
            .post<CarBrand[]>(this.url, JSON.stringify(item), { headers: this.headers })
            .pipe(catchError(this.handleError<CarBrand[]>));
    }

    update(id: number, item: CarBrand): Observable<CarBrand> {
        return this.http
            .put<CarBrand>(this.url + '/' + id, JSON.stringify(item), {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError<CarBrand>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
