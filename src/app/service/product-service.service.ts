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
    return this.http
      .get<Product[]>(url)
      .pipe(
        map(products => {
          const productArray: Product[] = [];
          for (const key in products) {
            if (products.hasOwnProperty(key)) {
              productArray.push({
                productId: products[key].productId,
                productType: products[key].productType,
                info: products[key].info,
                link: products[key].link,
                imageLink: products[key].imageLink,
                model: products[key].model,
                weight: products[key].weight,
                capacity: products[key].capacity,
                totalLength: products[key].totalLength,
                barrelLength: products[key].barrelLength,
                params: products[key].params,
                color: products[key].color,
                operatingPrinciple: products[key].operatingPrinciple,
                condition: products[key].condition,
                barrelOrientation: products[key].barrelOrientation,
                country: products[key].country,
                sleeveMaterial: products[key].sleeveMaterial,
                chargeType: products[key].chargeType,
                brand: products[key].brand,
                type: products[key].type,
                caliber: products[key].caliber,
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
