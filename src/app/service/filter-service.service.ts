import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FilterItem} from '../model/filterItem';
import {SelectItem} from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  selectItems: SelectItem[];

  constructor(private http: HttpClient) {
  }

  convertStringToSelectItem(arr: string[]) {
    this.selectItems = [];
    console.log(arr);
    for (const key in arr) {
      this.selectItems.push({
        label: arr[key],
        value: arr[key]
      });
    }
  }

  getFilters() {
    return this.http
      .get<FilterItem[]>('http://localhost:8080/product/filters/Gladkostvol')
      .pipe(
        map(filterItems => {
          const filterItemArray: FilterItem[] = [];
          for (const key in filterItems) {
            this.convertStringToSelectItem(filterItems[key].value);
            if (filterItems.hasOwnProperty(key)) {
              filterItemArray.push({
                menuItemName: filterItems[key].menuItemName,
                showName: filterItems[key].showName,
                filterKey: filterItems[key].filterKey,
                filterType: filterItems[key].filterType,
                rank: filterItems[key].rank,
                value: filterItems[key].value,
                selectItem: this.selectItems
              });
            }
          }
          return filterItemArray;
        })
      );
  }
}
