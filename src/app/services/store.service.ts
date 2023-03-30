import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort = 'desc', category? : string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products${
      category ? '/category/' + category : ''
    }?sort=${sort}&limit=${limit}`)
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
  }

  getOneProduct(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${STORE_BASE_URL}/products/${id}`)
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${STORE_BASE_URL}/products/${product.id}`, product)
  }

  deleteProduct(id: number): Observable<Product>{
    return this.httpClient.delete<Product>(`${STORE_BASE_URL}/products/${id}`);
  }
  addProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(`${STORE_BASE_URL}/products`, product);
  }
}
