import {Component} from '@angular/core';
import {ElementRef, OnInit, ViewChild} from 'angular2/core';
import {MenuItem} from 'primeng/api';
import {Type} from './model/Type';
import {MenuItemsService} from './service/menuItems-service';
import {ProductService} from './service/product-service.service';
import {Router} from '@angular/router';
import {Product} from './model/product';
import {environment} from '../environments/environment';
import {AutoComplete, Sidebar} from 'primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  machineBaseUrl = environment.machineBaseUrl;
  searchProductsUrl = this.machineBaseUrl + '8082/products/search?searchLine=';
  catalog: MenuItem[];
  horizontalMenu: MenuItem[];
  items: MenuItem[] = [];
  types: Type[];
  searchResults: any[];
  product: Product;
  currentSearchText: string;
  searchFieldVisible = false;

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

  searchOnRestore(event, autoComplete: AutoComplete) {
    autoComplete.search(event, this.currentSearchText);
  }

  mobileSearchEnter(event: KeyboardEvent, sidebar: Sidebar, autoComplete: AutoComplete) {
    if (event.key === 'Enter') {
      autoComplete.inputEL.nativeElement.value = '';
      sidebar.close(event);
      autoComplete.suggestions = [];  // sidebar closed, autocomplete hidden, but suggestions are clickable -- epic fuck up
      // this.avatarFocus.nativeElement.focus();
      this.router.navigate(['/search', {searchLine: this.currentSearchText}]);
    }
  }

  ngOnInit() {
    this.catalog = [
      {label: 'Каталог', icon: 'pi pi-bars', items: this.items, styleClass: 'non-icon'}
    ];
    this.horizontalMenu = [{items: this.items}];

    this.menuItemsService.getMenuItems().subscribe(menuItems => menuItems.forEach(mi => {
      this.refreshCommandSetting(mi);
      this.items.push(mi);
      const cutMenuItem: MenuItem = {
        label: mi.label, url: mi.url, routerLink: mi.routerLink, queryParams: mi.queryParams, command: mi.command
      };
      this.horizontalMenu.push(/*cutMenuItem*/mi);
    }));
  }

  refreshCommandSetting(mi: MenuItem) {
    mi.command = (event) => {
      this.router.navigate(['/']).then(() => this.router.navigate(event.item.routerLink, {queryParams: event.item.queryParams}));
    };
    const items = mi.items;
    if (items !== null && items.length !== 0) {
      items.forEach(item => {
        this.refreshCommandSetting(item);
      });
    }
  }
}
