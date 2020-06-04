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
import {
    CardModule,
    CarouselModule,
    DropdownModule,
    InputTextModule,
    LightboxModule, MessageModule, MessagesModule,
    RatingModule,
    ScrollPanelModule, SlideMenuModule,
    TabMenuModule,
    TooltipModule
} from 'primeng';
import {MegaMenuModule} from 'primeng/megamenu';
import {ProductDetailsComponent} from './component/product-details/product-details.component';
import {TableModule} from 'primeng/table';
import {GalleriaModule} from 'primeng/galleria';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SearchResultComponent} from './component/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    ProductDetailsComponent,
    SearchResultComponent
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
        TableModule,
        GalleriaModule,
        AutoCompleteModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            [
                {path: '', component: MainComponent},
                {path: 'product', component: ProductComponent},
                {path: 'product/:type', component: ProductComponent},
                {path: 'productPage/:productId', component: ProductDetailsComponent, runGuardsAndResolvers: 'always'},
                {path: 'search', component: SearchResultComponent}
            ],
            {onSameUrlNavigation: 'reload'}
        ),
        MegaMenuModule,
        LightboxModule,
        ScrollPanelModule,
        TabMenuModule,
        DropdownModule,
        RatingModule,
        CarouselModule,
        TooltipModule,
        CardModule,
        MessagesModule,
        MessageModule,
        SlideMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
