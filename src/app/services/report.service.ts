import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl=environment.authServerUrl;
  constructor(private http: HttpClient) { 
   
  }
  getEventsReport(role: string, ascid: string):Observable<any>{
   return this.http.get(this.baseUrl+'/report/eventReport',{ headers: { "id": ascid,"role":role } });
  }
}
