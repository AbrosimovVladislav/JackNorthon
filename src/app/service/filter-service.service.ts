import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FilterItem} from '../model/filterItem';
import {SItem} from '../model/SItem';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  machineBaseUrl = environment.baseApiUrl;
  selectItems: SItem[];
  filterItemArray: FilterItem[];
  sortOptions: SItem[] = [
    {title: 'Цена', label: 'Сначала дешевые', value: 'minPrice,asc'},
    {title: 'Цена', label: 'Сначала дорогие', value: 'minPrice,desc'},
    {title: 'Популярность', label: 'Популярность', value: 'rating.value,desc'},
    {title: 'Отзывы', label: 'Отзывы', value: 'reviewCount,desc'}
  ];

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

  getFilters(menuItem: string) {
    return this.http
      .get<FilterItem[]>(this.machineBaseUrl + '8082/product/filters/' + menuItem)
      .pipe(
        map(filterItems => {
          const filterItemArray: FilterItem[] = [];
          filterItemArray.push({
            menuItemName: '',
            showName: 'Сортировать по',
            filterKey: 'sort',
            filterType: 'SORT',
            rank: '1',
            value: null,
            selectItem: this.sortOptions
          });
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
