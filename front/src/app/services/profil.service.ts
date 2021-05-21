import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  user_id = sessionStorage.getItem('user_id');
  users$ = new Subject<User[]>();

  constructor(private http :HttpClient, 
              private auth: AuthService) { }

  getUsers() {
    this.http.get('http://localhost:3000/users').subscribe(
      (users: User[]) => {
        this.users$.next(users);
      },
      (error) => {
        this.users$.next([]);
        console.error(error);
      }
    );
  }
  getUserById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/user/'+ id).subscribe(
        (user: User) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyUser(id: string, user: User, image: string | File) {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
        this.http.put('http://localhost:3000/user/' + id, user).subscribe(
          (response: {message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deleteUser(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/user/' + id).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};


