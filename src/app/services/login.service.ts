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

  generateQR(): Observable<any> {
    const key = sessionStorage.getItem('secretkey')
    const url = `${this.baseUrl}/generate-qr/${key}`
    return this.http.get<any>(url);
  }

  validateCode(data:any): Observable<any> {
    const key = sessionStorage.getItem('secretkey')
    const url = `${this.baseUrl}/validate-code?secretKey=${key}&code=${data.code}`
    return this.http.post<any>(url,null);
  }
}
