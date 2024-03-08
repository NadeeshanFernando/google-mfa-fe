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

  generateQR(username:any): Observable<any> {
    console.log("username: ", username)
    const url = `${this.baseUrl}/generate-qr/${username}`
    return this.http.get<any>(url);
  }

  validateCode(username:any, code:any): Observable<any> {
    const url = `${this.baseUrl}/validate-code?username=${username}&code=${code.code}`
    return this.http.post<any>(url,null);
  }
}
