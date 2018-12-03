import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import { UrlServiceService } from '../services/url-service.service'
@Injectable()
export class AuthService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  
  public login(user:User): Promise<any> {
    console.log(user)
    let url: string = `${this.url.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  public ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/login/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  public ensureAuthenticatedwhenlogin(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  public Profile(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/user`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  public getAllAdmin(token): Promise<any> {
    let url: string =  `${this.url.BASE_URL}/admin`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  public addAdmin(token, detail) {
    let url : string = `${this.url.BASE_URL}/admin`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, detail, {headers: headers}).toPromise();
  }

  public updateAdmin(token, rowId) {
    let url : string = `${this.url.BASE_URL}/admin`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    const role = sessionStorage.getItem("role");
    return this.http.put(url, {rowId, role}, {headers: headers}).toPromise();
  }

}
