import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlServiceService } from '../services/url-service.service';
import { Student } from '../models/student';

@Injectable()
export class StudentServiceService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  addstudent(Student:Student,token)
  {
    let url: string = `${this.url.BASE_URL}/student`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Student,{headers: headers}).toPromise();
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
  editstudent(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/user/userbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{rowId},{headers: headers}).toPromise();
  }
  editstudentbyid(Student:Student,rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/user/student`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url,{Student,rowId},{headers: headers}).toPromise();
  }
  getAllData(token) {
    let url : string = `${this.url.BASE_URL}/search`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{},{headers: headers}).toPromise();
  }

  getAllDataByCondition(data, token) {
    let url : string = `${this.url.BASE_URL}/search`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,data,{headers: headers}).toPromise();
  }
  getAllDataByConditionMark(token) {
    let url : string = `${this.url.BASE_URL}/search/searchByMark`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{},{headers: headers}).toPromise();
  }
  getAllDataByConditionMarks(Data, token) {
    let url : string = `${this.url.BASE_URL}/search/searchByMark`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,Data,{headers: headers}).toPromise();
  }
}
