import {Component, Input, HostBinding} from '@angular/core';
import {Product} from "../model/product.model";

@Component({
    selector: 'product-image',
    templateUrl: './product-image.component.html',
    standalone: false
})
export class ProductImageComponent {
  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'ui small image';

  constructor() { }

}
