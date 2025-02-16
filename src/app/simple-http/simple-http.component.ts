import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UntypedFormGroup, UntypedFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHttpComponent implements OnInit {
  data: Object;
  loading: boolean = false;
  myForm: UntypedFormGroup;

  constructor(private http: HttpClient, fb: UntypedFormBuilder) {
    this.myForm = fb.group({
      // 'url': ['https://jsonplaceholder.typicode.com/posts']
      'url': ['https://api.github.com/repos/hkstwk/euler/contents/Euler/src/nl/hkolvoort/euler/P001_SumOfMultiples.java']
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
