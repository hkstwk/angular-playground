import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ProductsListComponent} from "../products-list/products-list.component";
import {ProductRowComponent} from "../product-row/product-row.component";
import {ProductImageComponent} from "../product-image/product-image.component";
import {ProductDepartmentComponent} from "../product-department/product-department.component";
import {PriceDisplayComponent} from "../price-display/price-display.component";

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InventoryComponent,
        ProductsListComponent,
        ProductRowComponent,
        ProductImageComponent,
        ProductDepartmentComponent,
        PriceDisplayComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
