import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http:  Http) { }
 getBarData() {
    return this.http.get('http://localhost:5020/api/v1/chartdata')
    .map((res) => res.json());
  }
}


