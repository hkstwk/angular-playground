import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSkuComponent } from './demo-sku.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DemoSkuComponent', () => {
  let component: DemoSkuComponent;
  let fixture: ComponentFixture<DemoSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoSkuComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
