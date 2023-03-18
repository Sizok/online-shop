import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static getProductsBasket() {
    throw new Error('Method not implemented.');
  }
  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<IProducts[]>(this.url)
  }

  getProduct(id: number){
    return this.http.get<IProducts>(`${this.url}/${id}`)
  }

  postProduct(product: IProducts){
    return this.http.post<IProducts>(this.url, product);
  }
  updateProduct(product: IProducts){
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }
  deleteProduct(id: number){
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  postProductToBasket(product: IProducts){
    return this.http.post<any>(this.urlBasket, product);
  }
  getProductsBasket(){
    return this.http.get<IProducts[]>(this.urlBasket);
  }
  updateProductBasket(product: IProducts){
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  removeProductFromBasket(id: number){
    return this.http.delete<any>(`${this.urlBasket}/${id}`);
  }
}
