import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FilterItem} from '../../model/filterItem';
import {ProductService} from '../../service/product-service.service';
import {FilterService} from '../../service/filter-service.service';
import {SItem} from '../../model/SItem';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  filters: FilterItem[];
  listBoxNgModelStub: SItem[];
  selectedFilters: Map<string, string[]>;
  filterKeyOnFilterName: Map<string, FilterItem>;
  basePath = 'http://localhost:8080/products';

  constructor(private productService: ProductService, private filterService: FilterService) {
    this.selectedFilters = new Map<string, string[]>();
    this.filterKeyOnFilterName = new Map<string, FilterItem>();
  }

  ngOnInit() {
    this.updateProducts(this.basePath);
    this.filterService.getFilters().subscribe(
      filters => {
        this.filters = filters;
        filters.forEach((filter: FilterItem) => {
          this.filterKeyOnFilterName.set(filter.showName, filter);
        });
      }
    );
  }

  updateProducts(url: string) {
    this.productService.getProducts(url).subscribe(
      products => {
        this.products = products;
        console.log(this.products);
      }
    );
  }

  sendRequest(event: any) {
    let requestPath = this.basePath + '?';
    console.log('Start of sendReq -> ' + requestPath);
    this.selectedFilters.forEach((value: string[], key: string) => {
      let intervalFlag = true;
      const currentFilterItem: FilterItem = this.filterKeyOnFilterName.get(key);
      key = currentFilterItem.filterKey;
      let paramString = '';
      value.forEach((filterValue: string) => {
        paramString += filterValue;
        if (currentFilterItem.filterType === 'CHECKBOX') {
          paramString += ',';
        } else if (currentFilterItem.filterType === 'RANGE') {
          if (intervalFlag) {
            paramString += 'interval';
            intervalFlag = false;
          }
        }
      });
      if (currentFilterItem.filterType === 'CHECKBOX') {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      paramString = key + '=' + paramString + '&';
      requestPath += paramString;
    });
    requestPath = requestPath.substring(0, requestPath.length - 1);
    console.log('End of sendReq -> ' + requestPath);
    this.updateProducts(requestPath);
  }


  refreshFilters(event: any) {
    const eventTargets: HTMLTextAreaElement[] = event.originalEvent.composedPath();
    for (const key in eventTargets) {
      const eventTarget = eventTargets[key];
      if (eventTarget.localName === 'p-listbox') {
        let value = event.originalEvent.target.outerText;
        if (value === '' || value === null) {
          value = this.extractValueFromEvent(eventTargets);
        }
        this.updateFilterMap(eventTarget.id, value);
      }
    }
  }

  extractValueFromEvent(path: HTMLTextAreaElement[]) {
    let value: string = null;
    let i = 0;
    while (value === null || value === '') {
      value = path[i].getAttribute('aria-label');
      i++;
    }
    return value;
  }

  updateFilterMap(filterName: string, value: string) {
    let values: string[];
    if (this.selectedFilters.has(filterName)) {
      values = this.selectedFilters.get(filterName);
      if (values.includes(value)) {
        values.splice(values.indexOf(value), 1);
      } else {
        values.push(value);
      }
    } else {
      values = [];
      values.push(value);
    }
    if (values.length === 0) {
      console.log('Before ' + this.selectedFilters.get(filterName));
      this.selectedFilters.delete(filterName);
      console.log('After ' + this.selectedFilters.get(filterName));
    } else {
      this.selectedFilters.set(filterName, values);
    }
  }
}
