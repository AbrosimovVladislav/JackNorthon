import {Component} from '@angular/core';
import {OnInit} from 'angular2/core';
import {MenuItem} from 'primeng/api';
import {Type} from './model/Type';
import {TypeService} from './service/type-service.service';
import {MenuItemsService} from './service/menuItems-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // items: MenuItem[];
  items: MenuItem[];
  types: Type[];
  lvl3Menu: Map<string, Map<string, Map<string, MenuItem>>> = new Map<string, Map<string, Map<string, MenuItem>>>();
  lvl2Menu: Map<string, Map<string, MenuItem>> = new Map<string, Map<string, MenuItem>>();

  constructor(private menuItemsService: MenuItemsService, private typeService: TypeService) {
  }

  /* ngOnInit() {
     this.typeService.getTypes()
       .subscribe(types => {
         types.forEach(type => {
           if (type.lower == null) {
             let lvl2: Map<string, MenuItem>;
             if (this.lvl2Menu.has(type.upper)) {
               lvl2 = this.lvl2Menu.get(type.upper);
               lvl2.set(type.medium, {label: type.medium, url: 'product', routerLink: ['/' + type.medium]});
             } else {
               lvl2 = new Map<string, MenuItem>([
                 [type.medium, {label: type.medium, url: 'product', routerLink: ['/' + type.medium]}]
               ]);
             }
             this.lvl2Menu.set(type.upper, lvl2);
           } else {
             let lvl2: Map<string, Map<string, MenuItem>>;
             let lvl3: Map<string, MenuItem>;
             if (this.lvl3Menu.has(type.upper)) {
               lvl2 = this.lvl3Menu.get(type.upper);
               if (lvl2.has(type.medium)) {
                 lvl3 = lvl2.get(type.medium);
                 lvl3.set(type.lower, {label: type.lower, url: 'product', routerLink: ['/' + type.lower]});
               } else {
                 lvl3 = new Map<string, MenuItem>([
                   [type.lower, {label: type.lower, url: 'product', routerLink: ['/' + type.lower]}]
                 ]);
               }
               lvl2.set(type.medium, lvl3);
               this.lvl3Menu.set(type.medium, lvl2);
             } else {
               lvl2 = new Map<string, Map<string, MenuItem>>([
                 [type.medium, new Map<string, MenuItem>([
                   [type.lower, {label: type.lower, url: 'product', routerLink: ['/' + type.lower]}]
                 ])]
               ]);
             }
             this.lvl3Menu.set(type.upper, lvl2);
           }
         });


         console.log('LVL2');
         this.lvl2Menu.forEach((lvl2, lvl1Name) => {
           console.log(lvl1Name);
           lvl2.forEach((mi1, lvl2Name) =>
             console.log('  ' + lvl2Name)
           );
         });
         console.log('LVL3');
         this.lvl3Menu.forEach((lvl1, lvl1Name) => {
           console.log(lvl1Name);
           lvl1.forEach((mi2, lvl2Name) => {
             console.log('  ' + lvl2Name);
             mi2.forEach((mi3, lvl3Name) =>
               console.log('    ' + lvl3Name)
             );
           });
         });
         // this.items = ;
       });
     this.items = [
       {label: 'Main', url: 'main'},
       {label: 'Product', url: 'product'},
       {
         label: 'АКСЕССУАРЫ',
         items: [
           {
             label: 'ДЛЯ ШЛЕМА',
             items: [
               {
                 label: 'АНТИФОГ',
               },
               {
                 label: 'ПОДШЛЕМНИКИ',
               },
             ]
           }
         ]
       }
     ];
   }*/

  ngOnInit() {
    this.items = [
      {label: 'Main', url: 'main'},
      {label: 'Product', url: 'product'}
    ];

    this.menuItemsService.getMenuItems().subscribe(menuItems => menuItems.forEach(mi => this.items.push(mi)));
    console.log(this.items);
  }
}
