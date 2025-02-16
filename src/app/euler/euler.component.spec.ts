import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EulerComponent } from './euler.component';
import {EulerService} from "./euler.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

describe('EulerComponent', () => {
  let component: EulerComponent;
  let fixture: ComponentFixture<EulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulerComponent ],
      providers: [EulerService, HttpClient, HttpHandler],
      imports: [ FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
