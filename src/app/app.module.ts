import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {ArticleComponent} from "./article/article.component";
import {RedditComponent} from "./reddit/reddit.component";
import {AboutComponent} from "./about/about.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductRowComponent} from "./product-row/product-row.component";
import {ProductImageComponent} from "./product-image/product-image.component";
import {PriceDisplayComponent} from "./price-display/price-display.component";
import {ProductDepartmentComponent} from "./product-department/product-department.component";
import {DirectivesComponent} from "./directives/directives.component";
import {DemoSkuComponent} from "./demo-sku/demo-sku.component";
import {SimpleHttpComponent} from "./simple-http/simple-http.component";
import {HttpClientModule} from "@angular/common/http";
import {YouTubeSearchComponent} from "./you-tube-search/you-tube-search.component";
import {youTubeSearcInjectables} from "./you-tube-search/you-tube-search.injectables";
import {SearchBoxComponent} from "./search-box/search-box.component";
import {SearchResultComponent} from "./search-result/search-result.component";
import {EulerComponent} from "./euler/euler.component";
import {EulerService} from "./euler/euler.service";
import {MessageService} from "./about/message.service";
import {ChatAppComponent} from "./chat-app/chat-app.component";
import {ChatMessagesService} from "./service/chat-messages.service";
import {ChatThreadsComponent} from "./chat-threads/chat-threads.component";
import {ChatThreadComponent} from "./chat-thread/chat-thread.component";
import {ChatMessageComponent} from "./chat-message/chat-message.component";
import {ChatWindowComponent} from "./chat-window/chat-window.component";
import {ChatNavBarComponent} from "./chat-nav-bar/chat-nav-bar.component";

const routes: Routes = [
    {path: '', redirectTo: 'reddit', pathMatch: 'full'},
    {path: 'reddit', component: RedditComponent},
    {path: 'inventory', component: InventoryComponent},
    {path: 'directives', component: DirectivesComponent},
    {path: 'form', component: DemoSkuComponent},
    {path: 'http', component: SimpleHttpComponent},
    {path: 'youtube_search', component: YouTubeSearchComponent},
    {path: 'euler', component: EulerComponent},
    {path: 'observables', component: AboutComponent},
    {path: 'chat', component: ChatAppComponent}
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
        DirectivesComponent,
        DemoSkuComponent,
        SimpleHttpComponent,
        YouTubeSearchComponent,
        SearchBoxComponent,
        SearchResultComponent,
        EulerComponent,
        ChatAppComponent,
        ChatThreadsComponent,
        ChatThreadComponent,
        ChatMessageComponent,
        ChatWindowComponent,
        ChatNavBarComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [EulerService, MessageService, ChatMessagesService, youTubeSearcInjectables],
    bootstrap: [AppComponent]
})
export class AppModule {
}
