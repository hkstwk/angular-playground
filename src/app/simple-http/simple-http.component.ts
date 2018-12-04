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
  loading: boolean;
  myForm: FormGroup;

  constructor(private http: HttpClient, fb: FormBuilder) {
    this.myForm = fb.group({
      'url': ['https://jsonplaceholder.typicode.com/posts']
    });
    this.loading = false;
  }

  ngOnInit() {
  }

  makeRequest(url: string): void {
    this.loading = true;
    this.http
      .get(url)
      .subscribe(data => {
        this.data = data;
        this.loading = false;
      });
  }

}
