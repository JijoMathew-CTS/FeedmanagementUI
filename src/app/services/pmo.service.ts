import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PmoService {

  constructor(private http: HttpClient) { }

  isPmo(): boolean {
    var role = localStorage.getItem("role");
    return role == "ROLE_PMO";

  }

}
