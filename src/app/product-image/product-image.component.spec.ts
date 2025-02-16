import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageComponent } from './product-image.component';
import { Product } from "../model/product.model";
import { Component } from "@angular/core";

describe('ProductImageComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  const host: string = "http://localhost:9876";

  @Component({
    selector: `host-component`,
    template: `<product-image [product]="product"></product-image>`,
    standalone: false
})
  class TestHostComponent {
    product: Product;

    setProduct(_product: Product) {
      this.product = _product;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should have an product image', () => {
    let product = new Product(
      'MYSHOES',
      'Black Running Shoes',
      '../assets/images/products/black-shoes.jpg',
      [],
      109.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('img#productImg').toBe);
  });

  it('should show product image source "..../assets/images/products/black-hat.jpg"', () => {
    let product  = new Product(
      'NICEHAT',
      'A nice black hat',
      '../assets/images/products/black-hat.jpg',
      ['Men','Accessories','Hats'],
      29.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('img#productImg').src).toEqual(host + '/assets/images/products/black-hat.jpg');
  });

});
