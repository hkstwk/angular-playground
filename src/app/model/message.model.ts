export class Message{

  message: number;
  created: Date;

  constructor(message: number) {
    this.message = message;
    this.created = new Date();
  }

}

