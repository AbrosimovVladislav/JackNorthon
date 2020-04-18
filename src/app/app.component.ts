import {Component} from '@angular/core';
import {OnInit} from 'angular2/core';
import {ProductService} from './service/product-service.service';
import {Product} from './model/product';
import {FilterItem} from './model/filterItem';
import {FilterService} from './service/filter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[];
  filters: FilterItem[];
  selectedFilterValues: FilterItem[];


  constructor(private productService: ProductService, private filterService: FilterService) {
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

}
