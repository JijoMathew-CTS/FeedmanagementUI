import { Injectable } from '@angular/core';
import { EventReport } from '../models/EventReport';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/Feedback';
import { Response } from 'src/app/models/Response';
import { environment } from 'src/environments/environment';
import { FeedbackOption } from '../models/FeedbackOption';
import { DashResponse } from '../models/DashResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private feedServerbackUrl = environment.feedbackServerUrl;
  response: Response;

    name: string;
    averageScore: number;

  constructor(private http: HttpClient, private router: Router) { }

  urlchk(eventId:string,employeeId:string){
    if(eventId ===null || employeeId===null || eventId ===undefined || employeeId===undefined || eventId ==="" || employeeId===""){
     alert("Invalid Link");
     this.router.navigate(['logout']);
    }
    else{
      return true;
    }
  }

  getReport(selectedValue: string, ascid: string): any {
   return this.http.get<EventReport[]>(this.feedServerbackUrl + 'report/' + selectedValue, { headers: { "ascid": ascid } });
   //return this.http.get<EventReport[]>(this.feedServerbackUrl + 'allUser');
  }

  getDashMetric(): any {
    return this.http.get<DashResponse>(this.feedServerbackUrl + 'report/dashboard')
  }

  saveFeedback(feedback: Feedback): Observable<any> {
    return this.http.post<Response>(this.feedServerbackUrl + 'feedbackSave', feedback);
  }

  saveNonPartFeedback(feedback: FeedbackOption): any {
    return this.http.post<Response>(this.feedServerbackUrl + 'nonPart', feedback);
  }

  saveUnRegFeedback(feedback: FeedbackOption): any {
    return this.http.post<Response>(this.feedServerbackUrl + 'unReg', feedback);
  }
  getDashChart(ascid:string): any {
    return this.http.get<DashResponse>(this.feedServerbackUrl + 'report/dashRpt/', { headers: { "ascid": ascid ,}, });
  }
  getAvgScore(ascid:string): any {
    return this.http.get<DashResponse>(this.feedServerbackUrl + 'report/avgRating',{ headers: { "ascid": ascid ,},});
  }
  
  getDetailReport(selectedValue: string,vStatus:string, ascid: string): any {
    return this.http.get<DashResponse[]>(this.feedServerbackUrl + 'detailReport/' + selectedValue, { headers: { "ascid": ascid ,"vStatus": vStatus }, });
  }
}
