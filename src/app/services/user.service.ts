import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<IUser[]>(this.url)
  }
}
