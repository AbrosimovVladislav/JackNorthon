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
  menu: MenuItem[];
  items: MenuItem[] = [];
  upperItems: MenuItem[] = [];
  types: Type[];

  constructor(private menuItemsService: MenuItemsService) {
  }

  ngOnInit() {
    this.menu = [
      {label: 'Main', url: 'main'},
      {label: 'Каталог', items: this.items}
    ];

    this.menuItemsService.getMenuItems().subscribe(menuItems => menuItems.forEach(mi => {
        this.items.push(mi);
        const cutMenuItem: MenuItem = {label: mi.label, url: mi.url, routerLink: mi.routerLink, queryParams: mi.queryParams};
        this.menu.push(cutMenuItem);
      }
    ));
  }
}
