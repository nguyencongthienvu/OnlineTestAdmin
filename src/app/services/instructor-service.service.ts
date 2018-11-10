import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service';
import { Instructor } from '../models/instructor';

@Injectable()
export class InstructorServiceService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  addinstructor(Instructor:Instructor,token)
  {
    let url: string = `${this.url.BASE_URL}/instructor`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Instructor,{headers: headers}).toPromise();
  }
  deletedepartment(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/user/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }
  editinstructor(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/user/userbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{rowId},{headers: headers}).toPromise();
  }
  editinstructorbyid(Instructor:Instructor,rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/user/instructor`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url,{Instructor,rowId},{headers: headers}).toPromise();
  }
}
