import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //`currentUser stream contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor() { }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> =[
  UsersService
];

