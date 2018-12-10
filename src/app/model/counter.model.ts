export class Counter{

  countValue: number;
  created: Date;

  constructor(countValue: number) {
    this.countValue = countValue;
    this.created = new Date();
  }

}

