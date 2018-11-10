import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UrlServiceService {
  BASE_URL: string = 'http://localhost:8181';
  constructor() { }

}
