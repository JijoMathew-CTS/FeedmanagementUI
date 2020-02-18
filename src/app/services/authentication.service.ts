import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authServerUrl = environment.authServerUrl;
  private user: User;
  
  userData: any = {};

private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  authenticate(): Observable<any> {
    return this.http.get<User>(this.authServerUrl + 'login')
  }

  logout(): Observable<any> {
    this.clearStorage();
    return this.http.get(this.authServerUrl + 'logout')
  }

  isLoggedIn(): boolean {
    var status = localStorage.getItem('userAuthentic')
    return status == "true";
  }

  setLoggedIn(status: boolean) {
    localStorage.setItem("userAuthentic", "" + status);
  }

  setUser(idsu: string, namesu: string, emailsu: string, rolesu: string, isUserAuthenticsu: string) {
    this.user = {
      id      : idsu,
      name    : namesu,
      emailId : emailsu,
      role    : rolesu,
      isUserAuthentic: isUserAuthenticsu
    }
    this.setUserInLocalStrorage();
  }

  getUser(): User {
    return this.user;
  }

  clearStorage() {
    localStorage.clear();
  }

  setUserInLocalStrorage() {
    localStorage.setItem("name", this.user.name);
    localStorage.setItem("email", this.user.emailId);
    localStorage.setItem("id", this.user.id);
    localStorage.setItem("role", this.user.role);
  }
}
