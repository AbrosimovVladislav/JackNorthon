import {SelectItem} from 'primeng';

export interface FilterItem {
  menuItemName;
  showName;
  filterKey;
  filterType;
  rank;
  value: string[];
  selectItem: SelectItem[];
}
