import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { Observable, catchError, map } from 'rxjs';
import { CarBrand } from '../models/carBrand';
import { CarModel } from '../models/carModel';
import { environment } from '../../environments/environment';

@Injectable()
export class ModelsService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.catalogApi + '/models';

    constructor(private http: HttpClient) {}

    getList(query: string = ''): Observable<CarModel[]> {
        return this.http
            .get<CarModel[]>(this.url + query)
            .pipe(catchError(this.handleError<CarModel[]>));
    }

    getById(id: number): Observable<CarModel> {
        return this.http.get<CarModel>(this.url + '/' + id);
    }

    delete(id: number): Observable<any> {
        return this.http
            .delete(this.url + '/' + id, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    create(item: CarModel[]): Observable<CarModel[]> {
        return this.http
            .post<CarModel[]>(this.url, JSON.stringify(item), {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError<CarModel[]>));
    }

    update(id: number, item: CarModel): Observable<CarModel> {
        return this.http
            .put<CarModel>(this.url + '/' + id, JSON.stringify(item), {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError<CarModel>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
