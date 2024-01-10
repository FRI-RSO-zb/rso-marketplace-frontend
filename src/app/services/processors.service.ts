import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProcessorsService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private url = environment.loaderAgentApi + '/processors';

    constructor(private http: HttpClient) {}

    getAll(): Observable<string[]> {
        return this.http
            .get<string[]>(this.url)
            .pipe(catchError(this.handleError<string[]>));
    }

    getProcessorTypes(processor: string): Observable<string[]> {
        return this.http
            .get<string[]>(this.url + '/' + processor + '/types')
            .pipe(catchError(this.handleError<string[]>));
    }

    processInput(processor: string, type: string, payload: string): Observable<string> {
        return this.http
            .post<string>(this.url + '/' + processor + '/' + type + '/process', payload, { headers: this.headers })
            .pipe(catchError(this.handleError<string>));
    }

    private handleError<T>(error: any): Promise<T> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}
