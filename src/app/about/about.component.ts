import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  counter : number = 0;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.counter += 1;
  }

}
