import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Car} from '../model/car';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  getCarsLarge() {
    return this.http
      .get<Car[]>('http://localhost:8080/cars')
      .pipe(
        map(cars => {
          const carArray: Car[] = [];
          for (const key in cars) {
            if (cars.hasOwnProperty(key)) {
              carArray.push({
                id: cars[key].id,
                vin: cars[key].vin,
                year: cars[key].year,
                brand: cars[key].brand,
                color: cars[key].color
              });
            }
          }
          return carArray;
        })
      );
  }

}
