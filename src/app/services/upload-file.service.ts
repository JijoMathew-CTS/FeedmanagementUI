import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http:HttpClient,private router: Router) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST','http://localhost:8090/uploadFile', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    //alert('File is completely uploaded!');
    this.router.navigate(['/uploadpmo']);
    return this.http.request(req);
  }
 
  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}
