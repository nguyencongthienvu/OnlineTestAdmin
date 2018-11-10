import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service'
@Injectable()
export class AccountServiceService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  accountstudent(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/student`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  accountinstructor(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/user/instructors`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  accountdepartment(token): Promise<any> {
    let url: string = `${this.url.BASE_URL}/user/department`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }
  
}
