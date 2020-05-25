import {Component} from '@angular/core';
import {OnInit} from 'angular2/core';
import {MenuItem} from 'primeng/api';
import {Type} from './model/Type';
import {MenuItemsService} from './service/menuItems-service';
import {ProductService} from './service/product-service.service';
import {Router} from '@angular/router';
import {Product} from './model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchProductsUrl: string = 'http://localhost:8082/products/search?searchLine=';
  menu: MenuItem[];
  items: MenuItem[] = [];
  types: Type[];
  searchResults: any[];
  product: Product;
  currentSearchText: string;
  screenWidth: number;
  smallScreenWidth = 576;

  constructor(private router: Router, private productService: ProductService, private menuItemsService: MenuItemsService) {
  }

  onSelect(product: Product) {
    this.product = product;
    this.router
      .navigate(['/'])
      .then(() => this.router.navigate(['/productPage/', product.productId]));
  }

  search(event) {
    this.currentSearchText = event.query;
    this.productService
      .getProducts(this.searchProductsUrl + this.currentSearchText)
      .subscribe(products => this.searchResults = products);
  }

  searchEnter(event) {
    if (event.key === 'Enter') {
      this.router.navigate(['/search', {searchLine: this.currentSearchText}]);
    }
  }

  ngOnInit() {
    this.menu = [
      /*      {label: 'Main', url: 'main'},*/
      {label: 'Каталог', items: this.items}
    ];

    this.menuItemsService.getMenuItems().subscribe(menuItems => menuItems.forEach(mi => {
        this.items.push(mi);
        // const cutMenuItem: MenuItem = {label: mi.label, url: mi.url, routerLink: mi.routerLink, queryParams: mi.queryParams};
        // this.menu.push(cutMenuItem);
      }
    ));
    this.screenWidth = screen.width;
    console.log('********************************');
    console.log(this.screenWidth);
  }
}
