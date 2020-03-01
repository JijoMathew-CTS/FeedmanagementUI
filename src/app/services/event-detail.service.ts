import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {
  private baseUrl=environment.authServerUrl;
  constructor(private http: HttpClient) { }
  getEventList(role: string, ascid: string):Observable<any>{
  
    return this.http.get(this.baseUrl+'/getEventDetails/'+ role, { headers: { "id": ascid } });
  }
  getEventBeneficiary(eid: string):Observable<any>{
    
    return this.http.get(this.baseUrl+'/getEventBeneficiary/'+ eid );
  }
}
