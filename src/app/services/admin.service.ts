import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackStatus } from '../models/FeedbackStatus';
import { environment } from 'src/environments/environment';
import { MailList } from '../models/MailList';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.feedbackServerUrl;

  constructor(private http: HttpClient) { }

  isAdmin(): boolean {
    
    var role = localStorage.getItem("role");
    return role == "ROLE_ADMIN";

  }
  createAdmin(id: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}` + `/addAdmin`, id);
  }
  createPMO(id: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}` + `/addPMO`, id);
  }

  getReport(selectedValue: string, ascid: string): any {
    return this.http.get<FeedbackStatus[]>(this.baseUrl + 'reportStatus/' + selectedValue, { headers: { "ascid": ascid } });
  }
  
  sentMail(mailList: MailList): Observable<any> {
    return this.http.post<Response>(this.baseUrl + 'sendEmail', mailList);
  }
  ListRoleEmp(role: string): Observable<any> {
    return this.http.post<any[]>(this.baseUrl + 'roleVsEmp', role);
  }
  RevokeRoleEmp(role: string,id:string): any {
    //return this.http.post<any[]>(this.baseUrl + 'revokeRoleEmp', {role,id,},{headers:{'id': id}});
    return this.http.post<any>(this.baseUrl+'revokeRoleEmp', {role,id,},{headers:{"id": id}});
  }
}