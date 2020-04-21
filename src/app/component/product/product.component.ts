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

  constructor(private productService: ProductService, private filterService: FilterService) {
    this.selectedFilters = new Map<string, string[]>();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        console.log(this.products);
      }
    );
    this.filterService.getFilters().subscribe(
      filters => {
        this.filters = filters;
        console.log(this.filters);
      }
    );
  }

  sendRequest(event: any){

  }


  refreshFilters(event: any) {
    console.log('handleClick method');
    const eventTargets: HTMLTextAreaElement[] = event.originalEvent.composedPath();
    for (const key in eventTargets) {
      const eventTarget = eventTargets[key];
      if (eventTarget.localName === 'p-listbox') {
        console.log(event);
        console.log(eventTargets);
        let value = event.originalEvent.target.outerText;
        if (value === '' || value === null) {
          value = this.extractValueFromEvent(eventTargets);
        }
        this.updateFilterMap(eventTarget.id, value);
      }
    }
    console.log(this.selectedFilters);
  }

  extractValueFromEvent(path: HTMLTextAreaElement[]) {
    console.log(-1);
    let value: string = null;
    let i = 0;
    while (value === null || value === '') {
      value = path[i].getAttribute('aria-label');
      i++;
    }
    return value;
  }

  updateFilterMap(filterName: string, value: string) {
    console.log('updateFilterMap method value: ' + value);
    let values: string[];
    if (this.selectedFilters.has(filterName)) {
      console.log('updateFilterMap if inside');
      values = this.selectedFilters.get(filterName);
      console.log(filterName);
      console.log(value);
      if (values.includes(value)) {
        values.splice(values.indexOf(value), 1);
      } else {
        values.push(value);
      }
    } else {
      values = [];
      values.push(value);
    }
    this.selectedFilters.set(filterName, values);
  }
}
