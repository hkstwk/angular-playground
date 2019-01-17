import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {User} from "../model/user.model";

export const testuser: User = new User('UserName', 'avatarSrc');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
    });

    service = TestBed.get(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user', () => {
    let user: User = null;

    service.setCurrentUser(testuser);
    service.currentUser.subscribe((_user: User) => {
      user = _user;
    });

    expect(user.name).toBe('UserName');
    expect(user.avatarSrc).toBe('avatarSrc');
    expect(user.id).toBeDefined();
  });
});
