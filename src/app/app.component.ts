import { Component } from '@angular/core';
import {OnInit} from 'angular2/core';
import {Car} from './model/car';
import {CarService} from './service/car-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getCarsLarge().subscribe(
      cars => {
        this.cars = cars;
        console.log(this.cars);
      }
    );
  }
}
