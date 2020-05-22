import {Component} from '@angular/core';
import {OnInit} from 'angular2/core';
import {MenuItem} from 'primeng/api';
import {Type} from './model/Type';
import {MenuItemsService} from './service/menuItems-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  types: Type[];

  constructor(private menuItemsService: MenuItemsService) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Main', url: 'main'},
      {label: 'Product', url: 'product'}
    ];

    this.menuItemsService.getMenuItems().subscribe(menuItems => menuItems.forEach(mi => this.items.push(mi)));
    console.log(this.items);
  }
}
