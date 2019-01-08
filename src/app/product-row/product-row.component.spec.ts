import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRowComponent } from './product-row.component';
import {Component} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductDepartmentComponent} from "../product-department/product-department.component";
import {ProductImageComponent} from "../product-image/product-image.component";
import {PriceDisplayComponent} from "../price-display/price-display.component";

describe('ProductRowComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  const host: string = "http://localhost:9876";

  @Component({
    selector: `host-component`,
    template: `<product-row 
      [product]="product"
      (click)='clicked(product)'
      >
</product-row>`
  })
  class TestHostComponent {
    product: Product;

    setProduct(_product: Product) {
      this.product = _product;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductRowComponent,
        ProductDepartmentComponent,
        ProductImageComponent,
        PriceDisplayComponent,
        TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should show product department "Men > Shoes > Running Shoes\n"', () => {
    let product = new Product(
        'MYSHOES',
        'Black Running Shoes',
        '../assets/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('product-department#productDept').innerText).toEqual("Men > Shoes > Running Shoes\n");
  });

  it('should show product name BLACK RUNNING SHOES', () => {
    let product = new Product(
      'MYSHOES',
      'Black Running Shoes',
      '../assets/images/products/black-shoes.jpg',
      ['Men', 'Shoes', 'Running Shoes'],
      109.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div#productName').innerText).toEqual("Black Running Shoes");
  });

  it('should show "SKU #MYSHOES"', () => {
    let product = new Product(
      'MYSHOES',
      'Black Running Shoes',
      '../assets/images/products/black-shoes.jpg',
      ['Men', 'Shoes', 'Running Shoes'],
      109.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div#productSKU').innerText).toEqual("SKU #MYSHOES");
  });

  it('should have image src "../assets/images/products/black-shoes.jpg" in innerHTML', () => {
    let product = new Product(
      'MYSHOES',
      'Black Running Shoes',
      '../assets/images/products/black-shoes.jpg',
      ['Men', 'Shoes', 'Running Shoes'],
      109.99);
    testHostComponent.setProduct(product);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('product-image#productImg').innerHTML).toContain('../assets/images/products/black-shoes.jpg');
  });
});
