import {Component, Input} from '@angular/core';
import {Product} from "../model/product.model";

@Component({
    selector: 'product-department',
    templateUrl: './product-department.component.html',
    styleUrls: ['./product-department.component.css'],
    standalone: false
})
export class ProductDepartmentComponent {
  @Input() product: Product;

}
