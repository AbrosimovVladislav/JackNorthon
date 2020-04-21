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
  selectedFilterValues: SItem[];
  selected: Map<string, string[]>;

  constructor(private productService: ProductService, private filterService: FilterService) {
    this.selected = new Map<string, string[]>();
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


  handleClick(event: any) {
    console.log(this.selectedFilterValues);
    const eventTargets: EventTarget[] = event.originalEvent.composedPath();
    for (const key in eventTargets) {
      const eventTarget = eventTargets[key];
      if (eventTarget.localName === 'p-listbox') {
        const value = event.originalEvent.target.outerText;
        this.updateFilterMap(eventTarget.id, value);
      }
    }
    console.log(this.selected);
  }

  updateFilterMap(filterName: string, value: string) {
    let values: string[];
    if (this.selected.has(filterName)) {
      values = this.selected.get(filterName);
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
    this.selected.set(filterName, values);
  }
}
