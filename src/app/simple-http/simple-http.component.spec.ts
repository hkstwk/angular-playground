import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SimpleHttpComponent} from "./simple-http.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('SimpleHttpComponent', () => {
  let component: SimpleHttpComponent;
  let fixture: ComponentFixture<SimpleHttpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleHttpComponent ],
      providers: [ HttpClient, HttpHandler ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
