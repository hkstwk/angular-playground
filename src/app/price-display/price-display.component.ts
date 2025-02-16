import {Component, Input} from '@angular/core';

@Component({
    selector: 'price-display',
    templateUrl: './price-display.component.html',
    standalone: false
})
export class PriceDisplayComponent {
  @Input() price: number;

  constructor() { }

}
