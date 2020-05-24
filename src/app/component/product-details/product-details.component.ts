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
  sliceOptions = {
    start: 0,
    end: 300,
    default: 300
  };
  expandTextVisible = true;

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
        for (let i = 0; i < 3; i++) {
          this.images.push({
            source: this.product.imageLink, alt: this.product.type.showName + ' ' +
              this.product.brand.shortName + ' ' +
              this.product.model + ' ' +
              this.product.age
          });
        }
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

  onExpandText($event: MouseEvent) {
    this.sliceOptions.end = this.sliceOptions.end ? undefined : this.sliceOptions.default;
    this.expandTextVisible = false;
  }

}
