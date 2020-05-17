import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(url: string) {
    console.log('we are in getProducts');
    return this.http
      .get<Product[]>(url)
      .pipe(
        map(products => {
          const productArray: Product[] = [];
          for (const key in products) {
            if (products.hasOwnProperty(key)) {
              productArray.push({
                productId: products[key].productId,
                model: products[key].model,
                brand: products[key].brand,
                type: products[key].type,
                age: products[key].age,
                description: products[key].description,
                characteristics: products[key].characteristics,
                link: products[key].link,
                imageLink: 'assets/showcase' + products[key].imageLink.substring(14),
                weaponPlatform: products[key].weaponPlatform,
                rating: products[key].rating,
                minPrice: products[key].minPrice
              });
            }
          }
          return productArray;
        })
      );
  }
}
