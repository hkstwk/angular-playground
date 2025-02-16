import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDisplayComponent } from './price-display.component';
import { Product } from "../model/product.model";
import { Component } from "@angular/core";

describe('PriceDisplayComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: `host-component`,
    template: `<price-display [price]="price"></price-display>`,
    standalone: false
})
  class TestHostComponent {
    price: number;

    setPrice(_price: number) {
      this.price = _price;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceDisplayComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should show product price of 109.99', () => {
    let price = 109.99;
    testHostComponent.setPrice(price);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div#priceDisplay').innerText).toEqual('109.99');
  });
});
