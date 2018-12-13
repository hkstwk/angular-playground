import {Message} from "../model/message.model";
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class MessageService {
  private currentMessage: Subject<Message> = new BehaviorSubject<Message>(null);

  constructor() {
  }

  public setCurrentMessage(newMessage: Message): void {
    this.currentMessage.next(newMessage);
  }

  public clearCurrentMessage(){
    this.currentMessage.next();
  }

  public getCurrentMessage() : Observable<Message> {
    return this.currentMessage.asObservable();
  }

}
