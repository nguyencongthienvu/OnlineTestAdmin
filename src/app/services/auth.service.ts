import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';
import { UrlServiceService } from '../services/url-service.service'
@Injectable()
export class AuthService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  login(user:User): Promise<any> {
    console.log(user)
    let url: string = `${this.url.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/login/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  ensureAuthenticatedwhenlogin(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  Profile(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/user`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
}
