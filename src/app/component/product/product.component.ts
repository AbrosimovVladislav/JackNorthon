import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FilterItem} from '../../model/filterItem';
import {ProductService} from '../../service/product-service.service';
import {FilterService} from '../../service/filter-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  basePath = 'http://localhost:8080/products';
  products: Product[];
  filters: FilterItem[];

  selectedFilterMap: Map<string, string[]>;
  filterKeyOnFilterName: Map<string, FilterItem>;

  constructor(private productService: ProductService, private filterService: FilterService) {
    this.filterKeyOnFilterName = new Map<string, FilterItem>();
    this.selectedFilterMap = new Map<string, string[]>();
  }

  ngOnInit() {
    this.updateProducts(this.basePath);
    this.filterService.getFilters().subscribe(
      filters => {
        this.filters = filters;
        filters.forEach((filter: FilterItem) => {
          this.filterKeyOnFilterName.set(filter.filterKey, filter);
          let selectedArray: string[] = [];
          if (filter.filterType === 'RANGE') {
            selectedArray = filter.value;
          }
          this.selectedFilterMap.set(filter.filterKey, selectedArray);
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

  addPaginationSize(url: string, size: number) {
    const sizePath = 'size=' + size;
    return url.indexOf('?') === -1
      ? '?' + sizePath
      : '&' + sizePath;
  }

  sendRequest(event: any) {
    this.selectedFilterMap.forEach(
      (internalFilterArr: string[], key: string) => {
        if (internalFilterArr.length === 0) {
          this.selectedFilterMap.delete(key);
        }
      }
    );

    let requestPath = this.basePath + '?';
    this.selectedFilterMap.forEach((value: string[], key: string) => {
      let intervalFlag = true;
      const currentFilterItem: FilterItem = this.filterKeyOnFilterName.get(key);
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
    requestPath += this.addPaginationSize(requestPath, 50);
    this.updateProducts(requestPath);
  }
}
