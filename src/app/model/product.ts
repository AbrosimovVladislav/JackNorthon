import {Brand} from './brand';
import {Rating} from './rating';

export interface Product {
  productId;
  productType;
  info;
  link;
  imageLink;
  model;
  weight;
  capacity;
  totalLength;
  barrelLength;
  params;
  color;
  operatingPrinciple;
  condition;
  barrelOrientation;
  country;
  sleeveMaterial;
  chargeType;
  brand: Brand;
  type;
  caliber;
  weaponPlatform;
  rating: Rating;
  minPrice;
}
