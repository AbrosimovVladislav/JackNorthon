import { Injectable } from '@angular/core';
import {Http, Response} from 'angular2/http';
import {Car} from '../model/car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: Http) {}

  getCarsLarge() {
    return this.http.get('/showcase/resources/data/cars-large.json')
      .toPromise()
      .then(res => res.json().data as Car[])
      .then(data => data);
  }
}
