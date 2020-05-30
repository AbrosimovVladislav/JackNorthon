import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product-service.service';
import {Product} from '../../model/product';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  machineBaseUrl = environment.machineBaseUrl;
  searchProductsUrl = this.machineBaseUrl + '8082/products/search?searchLine=';
  resultProducts: Product[];

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
        this.productService
          .getProducts(this.searchProductsUrl + paramMap.get('searchLine'))
          .subscribe(products => this.resultProducts = products);
      }
    );


  }

}
