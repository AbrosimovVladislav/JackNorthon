import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Offer} from '../model/offer';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  machineBaseUrl = environment.machineBaseUrl;

  constructor(private http: HttpClient) {
  }

  getOffersById(productId: string) {
    const url = this.machineBaseUrl + '8082/offers/' + productId;
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
