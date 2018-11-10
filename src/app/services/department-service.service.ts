import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Department } from '../models/department';
import { UrlServiceService } from '../services/url-service.service';
@Injectable()
export class DepartmentServiceService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http,private url: UrlServiceService) {}
  adddepartment(Department:Department,token)
  {
    let url: string = `${this.url.BASE_URL}/department`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, Department,{headers: headers}).toPromise();
  }
  getdepartmentbyid(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/department/departmentbyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url,{rowId},{headers: headers}).toPromise();
  }
  editdepartment(Department:Department,token,rowId)
  {
    console.log(Department)
    let url: string = `${this.url.BASE_URL}/department`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url,{Department,rowId},{headers: headers}).toPromise();
  }
  deletedepartment(rowId,token)
  {
    let url: string = `${this.url.BASE_URL}/department/`+rowId;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url,{headers: headers}).toPromise();
  }
  getCourseData(token) {
    let url : string = `${this.url.BASE_URL}/deptcourse`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get(url,{headers: headers}).toPromise();
  }
  addCourse(data, token) {
    let url : string = `${this.url.BASE_URL}/deptcourse`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, data, {headers: headers}).toPromise();
  }
  getCourseDataById(token, id) {
    let url : string = `${this.url.BASE_URL}/deptcourse/coursebyid`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post(url, { id }, {headers: headers}).toPromise();
  }
  EditCourse(data, token) {
    let url : string = `${this.url.BASE_URL}/deptcourse`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put(url, data, {headers: headers}).toPromise();
  }

  DeleteCourse(id, token){
    let url : string = `${this.url.BASE_URL}/deptcourse/`+id;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.delete(url, {headers: headers}).toPromise();
  }
}
