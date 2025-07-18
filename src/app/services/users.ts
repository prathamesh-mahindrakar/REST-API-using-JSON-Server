import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Users {

  url = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.url);
  }

  saveUsers(user: user): Observable<user> {
    return this.http.post<user>(this.url, user)
  }

  deleteUsers(id: string): Observable<user> {
    return this.http.delete<user>(this.url + "/" + id);
  }

  getSelectedUser(id: string): Observable<user> {
    return this.http.get<user>(this.url + "/" + id);
  }

  updateUser(user: user): Observable<user> {
    return this.http.put<user>(this.url + "/" + user.id, user);
  }

}
