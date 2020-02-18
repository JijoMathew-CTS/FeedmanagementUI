import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PocService {

  constructor(private http: HttpClient) { }

  isPoc(): boolean {
    var role = localStorage.getItem("role");
    return role == "ROLE_POC";

  }
}
