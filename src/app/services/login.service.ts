import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data)
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-user`, data)
  }

  generateQR(username:any): Observable<any> {
    const data = { username: username };
    return this.http.post<any>(`${this.baseUrl}/generate-qr`, data);
  }

  validateCode(username:any, code:number): Observable<any> {
    const data = { username: username, code: code };
    return this.http.post<any>(`${this.baseUrl}/validate-code`,data);
  }

}
