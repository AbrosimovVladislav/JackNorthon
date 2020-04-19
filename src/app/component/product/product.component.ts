import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {FilterItem} from '../../model/filterItem';
import {MenuItem} from 'primeng';
import {ProductService} from '../../service/product-service.service';
import {FilterService} from '../../service/filter-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
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
