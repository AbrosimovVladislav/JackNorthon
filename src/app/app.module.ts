import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';
import {MenubarModule} from 'primeng/menubar';
import {RouterModule} from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {ProductComponent} from './component/product/product.component';
import {SliderModule} from 'primeng/slider';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputTextModule} from 'primeng';
import {MegaMenuModule} from 'primeng/megamenu';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    DataViewModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ListboxModule,
    MenubarModule,
    SliderModule,
    KeyFilterModule,
    InputTextModule,
    RouterModule.forRoot(
      [
        {path: 'main', component: MainComponent},
        {path: 'product', component: ProductComponent},
        {path: 'product/:type', component: ProductComponent},
        {path: 'productPage/:productId', component: ProductDetailsComponent}
      ]
    ),
    MegaMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
