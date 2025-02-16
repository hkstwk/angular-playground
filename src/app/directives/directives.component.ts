import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-directives',
    templateUrl: './directives.component.html',
    styleUrls: ['./directives.component.css'],
    standalone: false
})
export class DirectivesComponent implements OnInit {
  choices: number[];
  choice: number;
  index: number;

  constructor() {
    this.choices = [1,2,3,4,2 ];
    this.index = 0;
  }

  ngOnInit() {

  }

  nextChoice() {
    this.index += 1;
    if (this.index == this.choices.length) {
      this.index = 0;
    }
    this.choice = this.choices[this.index];
  }

}
