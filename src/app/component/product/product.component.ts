import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {FilterItem} from '../../model/filterItem';
import {ProductService} from '../../service/product-service.service';
import {FilterService} from '../../service/filter-service.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ONLY_DIGITS_REGEX = RegExp('^[\\d]+$');
  ONLY_WHITESPACES_REGEX = RegExp('^[\\s]+$');
  machineBaseUrl = environment.machineBaseUrl;
  basePath = this.machineBaseUrl + '8082/products';
  inStock = true;
  products: Product[];
  filters: FilterItem[];
  queryMap: ParamMap;
  typeName: string;
  typeIds: string;
  condition: boolean;
  validMinPrice: boolean;
  validMaxPrice: boolean;
  validPriceRange: boolean;
  selectedFilterMap: Map<string, string[]> = new Map<string, string[]>();
  filterKeyOnFilterName: Map<string, FilterItem> = new Map<string, FilterItem>();
  defaultMinPrice: string;
  defaultMaxPrice: string;
  private useDefaultMinPrice: boolean;
  private useDefaultMaxPrice: boolean;

  constructor(private route: ActivatedRoute, private productService: ProductService, private filterService: FilterService) {
  }

  scrollTo() {
    scrollTo(0, 0);
  }

  ngOnInit() {
    this.route
      .paramMap
      .subscribe(paramMap => {
        this.typeName = paramMap.get('type');
      });
    this.route.queryParamMap
      .subscribe(paramMap => {
        this.queryMap = paramMap;
        this.typeIds = this.queryMap.get('typeId');
        const requestPath = this.basePath + '?' + 'type.typeId=' + this.typeIds + '&inStock=' + this.inStock;
        this.updateProducts(requestPath);
      });
    const menuItem = this.queryMap.get('menuItem');
    this.filterService.getFilters(menuItem).subscribe(
      filters => {
        this.filters = filters;
        filters.forEach((filter: FilterItem) => {
          this.filterKeyOnFilterName.set(filter.filterKey, filter);
          let selectedArray: string[] = [];
          if (filter.filterType === 'RANGE') {
            selectedArray = filter.value;
          }
          this.selectedFilterMap.set(filter.filterKey, selectedArray);
          if (filter.filterKey === 'offer.price') {
            this.storeDefaultPriceValues(filter.value);
          }
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

  clearFilters() {
    this.refreshPage();
  }

  refreshPage(){
    location.reload();
  }

  sendRequest() {
    if (this.isDisabled()) { return; }
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

      if (currentFilterItem.filterType === 'DROPDOWN' || currentFilterItem.filterType === 'SORT') {
        paramString = value.toString();
      } else {
        value.forEach((filterValue: string) => {
          if (currentFilterItem.filterType === 'CHECKBOX') {
            paramString += ',';
            paramString += filterValue;
          } else if (currentFilterItem.filterType === 'RANGE') {
            if (intervalFlag) {
              if (this.useDefaultMinPrice) {
                paramString += this.defaultMinPrice;
              } else {
                paramString += filterValue;
              }
              paramString += 'interval';
              intervalFlag = false;
            } else {
              if (this.useDefaultMaxPrice) {
                paramString += this.defaultMaxPrice;
              } else {
                paramString += filterValue;
              }
            }
          }
        });
      }
      if (currentFilterItem.filterType === 'CHECKBOX') {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      paramString = key + '=' + paramString + '&';
      requestPath += paramString;
    });
    requestPath = requestPath.substring(0, requestPath.length - 1);
    requestPath += '&' + 'type.typeId=' + this.typeIds + '&inStock=' + this.inStock;
    this.updateProducts(requestPath);
  }

  isValidMinPrice(inputMinPrice, inputMinPriceElem: HTMLInputElement) {
    this.useDefaultMinPrice = inputMinPrice === '' || this.ONLY_WHITESPACES_REGEX.test(inputMinPrice);
    if (this.useDefaultMinPrice) {
      inputMinPriceElem.value = '';
      this.validMinPrice = true;
    } else {
      this.validMinPrice = this.ONLY_DIGITS_REGEX.test(inputMinPrice.trim());
    }
  }
  isValidMaxPrice(inputMaxPrice, inputMaxPriceElem: HTMLInputElement) {
    this.useDefaultMaxPrice = inputMaxPrice === '' || this.ONLY_WHITESPACES_REGEX.test(inputMaxPrice);
    if (this.useDefaultMaxPrice) {
      inputMaxPriceElem.value = '';
      this.validMaxPrice = true;
    } else {
      this.validMaxPrice = this.ONLY_DIGITS_REGEX.test(inputMaxPrice.trim());
    }
  }
  isValidRange(minPrice, maxPrice) {
    const minPriceNum = parseFloat(minPrice.trim());
    const maxPriceNum = parseFloat(maxPrice.trim());
    this.validPriceRange = (minPriceNum <= maxPriceNum) || this.useDefaultMinPrice || this.useDefaultMaxPrice;
  }
  isDisabled() {
    return !(this.validMinPrice && this.validMaxPrice && this.validPriceRange);
  }

  up() {
    window.scroll(0, 0);
  }
  onWindowScroll() {
    this.condition = window.pageYOffset > 200;
  }

  private storeDefaultPriceValues(minMaxPrice: string[]) {
    this.defaultMinPrice = minMaxPrice[0];
    this.defaultMaxPrice = minMaxPrice[1];
  }
}
