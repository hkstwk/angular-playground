import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDepartmentComponent } from './product-department.component';
import { Product } from "../model/product.model";
import { Component } from "@angular/core";
import {Article} from "../article/article.model";

describe('ProductDepartmentComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: `host-component`,
    template: `<product-department [product]="product"></product-department>`,
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
      declarations: [ ProductDepartmentComponent, TestHostComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should show "" (nothing)', () => {
    let product = new Product(
      'MYSHOES',
      'Black Running Shoes',
      '../assets/images/products/black-shoes.jpg',
      [], // <-- empty product department
      109.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div#productDept').innerText).toEqual("");
  });

  it('should show "Women > Apparel > Jackets & Vests"', () => {
    let product = new Product(
      'NEATOJACKET',
      'Blue Jacket',
      '../assets/images/products/blue-jacket.jpg',
      ['Women', 'Apparel', 'Jackets & Vests'], // <-- product department subject to test
      238.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div#productDept').innerText).toEqual("Women > Apparel > Jackets & Vests");
  });

  it('should show "Men > Accessories > Hats"', () => {
    let product  = new Product(
      'NICEHAT',
      'A nice black hat',
      '../assets/images/products/black-hat.jpg',
      ['Men','Accessories','Hats'], // <-- product department subject to test
      29.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div#productDept').innerText).toEqual("Men > Accessories > Hats");
  });

});
