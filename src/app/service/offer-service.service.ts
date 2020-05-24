import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Offer} from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {
  }

  getOffersById(productId: string) {
    const url = 'http://localhost:8082/offers/' + productId;
    console.log('we are in getoffers');
    return this.http
      .get<Offer[]>(url)
      .pipe(
        map((offers: Offer | Offer[]) => {
          const offerArray: Offer[] = [];
          for (const key in offers) {
            if (offers.hasOwnProperty(key)) {
              if (offers[0] !== undefined) {
                offerArray.push({
                  shop: offers[key].shop,
                  price: offers[key].price,
                  link: offers[key].link
                });
              } else {
                const offer: Offer = offers as Offer;
                offerArray.push({
                  shop: offer.shop,
                  price: offer.price,
                  link: offer.link
                });
              }
            }
          }
          return offerArray;
        })
      );
  }
}