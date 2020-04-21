import {SItem} from './SItem';

export interface FilterItem {
  menuItemName;
  showName;
  filterKey;
  filterType;
  rank;
  value: string[];
  selectItem: SItem[];
}
