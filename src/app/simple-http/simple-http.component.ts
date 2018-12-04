import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHttpComponent implements OnInit {
  data: Object;
  loading: boolean = false;
  myForm: FormGroup;

  constructor(private http: HttpClient, fb: FormBuilder) {
    this.myForm = fb.group({
      'url': ['https://jsonplaceholder.typicode.com/posts']
    });
  }

  ngOnInit() {
  }

  makeRequest(url: string): void {
    if (this.data) this.data = null;
    this.loading = true;
    this.http
      .get(url)
      .subscribe(
        (data: any) => {
        this.data = data;
        this.loading = false;
      },
      (err: any) => {
        this.data = err;
        this.loading = false;
      });
  }

  reset(): void {
    this.loading = false;
    this.data = null;
  }

}
