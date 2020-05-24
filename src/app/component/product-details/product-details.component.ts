import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product-service.service';
import {Offer} from '../../model/offer';
import {OfferService} from '../../service/offer-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: string;
  product: Product;
  offers: Offer[];
  images: any[] = [];

  constructor(private offerService: OfferService, private route: ActivatedRoute, private  productService: ProductService) {
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(paramMap => {
        this.productId = paramMap.get('productId');
      });
    console.log(this.productId);

    this.productService.getProducts('http://localhost:8082/products/' + this.productId).subscribe(
      products => {
        this.product = products[0];
        console.log(this.product);
        this.images.push({source: this.product.imageLink});
        this.images.push({source: this.product.imageLink});
        this.images.push({source: this.product.imageLink});
      }
    );

    this.offerService.getOffersById(this.productId).subscribe(
      offers => {
        this.offers = offers;
        console.log('CURRENT OFFERS ->');
        console.log(this.offers);
      }
    );
  }

}
