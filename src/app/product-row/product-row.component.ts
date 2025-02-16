import { Component, OnInit, Input, HostBinding} from '@angular/core';
import { Product } from '../model/product.model';

@Component({
    selector: 'product-row',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.css'],
    standalone: false
})
export class ProductRowComponent implements OnInit {
  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'item';

  constructor() { }

  ngOnInit() {
  }

}
