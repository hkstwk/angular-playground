import { Component, EventEmitter} from '@angular/core';
import {Product} from '../model/product.model';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css'],
    standalone: false
})
export class InventoryComponent {
  products: Product[];

  constructor() {
    this.products = [
      new Product(
        'MYSHOES',
        'Black Running Shoes',
        '../assets/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99),
      new Product(
        'NEATOJACKET',
        'Blue Jacket',
        '../assets/images/products/blue-jacket.jpg',
        ['Women', 'Apparel', 'Jackets & Vests'],
        238.99),
      new Product(
        'NICEHAT',
        'A nice black hat',
        '../assets/images/products/black-hat.jpg',
        ['Men','Accessories','Hats'],
        29.99),
      ]
  }

  productWasSelected(product: Product): void {
    console.log('Product clicked: ', product);
}


}
