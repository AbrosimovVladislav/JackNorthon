import {Brand} from './brand';
import {Rating} from './rating';
import {Type} from './Type';

export interface Product {
  productId;
  model;
  brand: Brand;
  type: Type;
  age;
  description;
  characteristics;
  link;
  imageLink;
  rating: Rating;
  minPrice;
  offerQuantity: number;
}

