import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StoreService } from './store.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor( private router: Router, private storeService: StoreService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    return this.storeService.getOneProduct(route.params?.['id']).pipe(
      tap(product => {
        if(!product) {
          this.router.navigate(['products']);
        }

      }),
      catchError(()=>{
        debugger;
        this.router.navigate(['products']);
        return EMPTY;
      })
    )
  }
}
