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
  machineBaseUrl = environment.baseApiUrl;
  searchProductsUrl = this.machineBaseUrl + '8082/products/search?searchLine=';
  resultProducts: Product[];
  condition: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  scrollTo() {
    scrollTo(0, 0);
  }

  up() {
    window.scroll(0, 0);
  }

  onWindowScroll() {
    this.condition = window.pageYOffset > 200;
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
