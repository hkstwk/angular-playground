import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import {ProductRowComponent} from "../product-row/product-row.component";
import {ProductImageComponent} from "../product-image/product-image.component";
import {ProductDepartmentComponent} from "../product-department/product-department.component";
import {PriceDisplayComponent} from "../price-display/price-display.component";

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          ProductsListComponent,
          ProductRowComponent,
          ProductImageComponent,
          ProductDepartmentComponent,
          PriceDisplayComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
