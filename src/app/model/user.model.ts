
import {UUID} from "angular2-uuid";
/**
 * A User represents an agent that sends messages
 */
export class User{
  id: string;

  constructor(public name: string, public avatarSrc: string) {
    this.id = UUID.UUID();
  }
}
