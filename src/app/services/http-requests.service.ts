import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  logIn(id: number): Observable<any> {
    return this.http.get('api/login/' + id);
  }

  getShiftDetails(id: number): Observable<any> {
    return this.http.get('/api/shifts/' + id);
  }

  addShifts(id: number, param) {
    return this.http.post('/api/add/shift/' + id, param)
  }


}
