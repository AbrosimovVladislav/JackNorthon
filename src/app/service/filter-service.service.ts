import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FilterItem} from '../model/filterItem';
import {SItem} from '../model/SItem';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  selectItems: SItem[];
  filterItemArray: FilterItem[];

  constructor(private http: HttpClient) {
  }

  convertStringToSelectItem(name: string, arr: string[]) {
    this.selectItems = [];
    for (const key in arr) {
      this.selectItems.push({
        title: name,
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
            this.convertStringToSelectItem(filterItems[key].showName, filterItems[key].value);
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
          this.filterItemArray = filterItemArray;
          return filterItemArray;
        })
      );
  }
}
