import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MenuItem} from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  constructor(private http: HttpClient) {
  }

  getMenuItems() {
    return this.http
      .get<MenuItem[]>('http://localhost:8082/menuItems')
      .pipe(
        map(menuItems => {
          const menuItemsArr: MenuItem[] = [];
          for (const key in menuItems) {
            if (menuItems.hasOwnProperty(key)) {
              menuItemsArr.push({
                label: menuItems[key].label,
                url: menuItems[key].url,
                routerLink: menuItems[key].routerLink,
                queryParams: menuItems[key].queryParams,
                items: menuItems[key].items
              });
            }
          }
          return menuItemsArr;
        })
      );
  }
}
