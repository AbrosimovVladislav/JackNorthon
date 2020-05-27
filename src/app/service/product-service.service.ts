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
        map((products: Product | Product[]) => {
            const productArray: Product[] = [];
            for (const key in products) {
              if (products.hasOwnProperty(key)) {
                if (products[0] !== undefined) {
                  productArray.push({
                    productId: products[key].productId,
                    model: products[key].model,
                    brand: products[key].brand,
                    type: products[key].type,
                    age: products[key].age,
                    description: products[key].description,
                    characteristics: products[key].characteristics,
                    link: products[key].link,
                    imageLink: products[key].imageLink,
                    rating: products[key].rating,
                    minPrice: products[key].minPrice,
                    offerQuantity: products[key].offerQuantity
                  });
                } else {
                  const product: Product = products as Product;
                  productArray.push({
                    productId: product.productId,
                    model: product.model,
                    brand: product.brand,
                    type: product.type,
                    age: product.age,
                    description: product.description,
                    characteristics: product.characteristics,
                    link: product.link,
                    imageLink: product.imageLink,
                    rating: product.rating,
                    minPrice: product.minPrice,
                    offerQuantity: product.offerQuantity
                  });
                }
              }
            }
            return productArray;
          }
        )
      );
  }
}
