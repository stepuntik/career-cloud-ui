import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<firebase.User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: firebase.User | null): void {
    this.userSubject.next(user);
  }

  getUser(): firebase.User | null {
    return this.userSubject.value;
  }
}
