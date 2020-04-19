import {Component} from '@angular/core';
import {OnInit} from 'angular2/core';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {label: 'Main', url: 'main'},
      {label: 'Product', url: 'product'}
    ];
  }
}
