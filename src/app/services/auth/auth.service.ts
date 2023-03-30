import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';

const AUTH_URL = 'https://fakestoreapi.com/auth/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  updateProduct(product: Product) {
    throw new Error('Method not implemented.');
  }
  private isAuth: boolean = false;
  constructor(private route: Router, private http: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return this.getToken() !== null;
  }

  login(userInfo: {email: string, password: string}): Observable<string | boolean>{
    if(userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123'){
      this.setToken('asdsadasdasdassdf1231');
      return of(true);
    }
    return throwError(()=> new Error('Fail connecting...'));
  }

  realLogin(userInfo: {username: string, password: string}): Observable<object> {
    return this.http.post<object>(AUTH_URL, userInfo);
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }
}
