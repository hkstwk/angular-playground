import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { RedditComponent} from "./reddit/reddit.component";
import { AboutComponent } from "./about/about.component";
import { InventoryComponent } from './inventory/inventory.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductRowComponent } from './product-row/product-row.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { PriceDisplayComponent } from './price-display/price-display.component';
import { ProductDepartmentComponent } from './product-department/product-department.component';
import { DirectivesComponent } from './directives/directives.component';

const routes: Routes = [
  { path: '', redirectTo: 'reddit', pathMatch: 'full' },
  { path: 'reddit', component: RedditComponent },
  { path: 'inventory', component: InventoryComponent},
  { path: 'directives', component: DirectivesComponent},
  { path: 'about', component: AboutComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    RedditComponent,
    AboutComponent,
    InventoryComponent,
    ProductsListComponent,
    ProductRowComponent,
    ProductImageComponent,
    PriceDisplayComponent,
    ProductDepartmentComponent,
    DirectivesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
