import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { OpenDialogService } from 'src/app/services/opendialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  isLoggedIn: boolean;
  @Input() get cart(): Cart { return this._cart; }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.map((item) => item.quantity).reduce((prev, current) => prev +current ,0)
  }
  product: Product;
  dialogRefSubscribe: Subscription;
  constructor(private basketService: BasketService, private authService: AuthService, private openDialogService: OpenDialogService) { }

  ngOnInit(): void {
    this.isLoggedInned();
  }

  getTotal(items: Array<CartItem>):number{
    return this.basketService.getTotal(items);
  }

  onOpenDialog(): void {
    const dialogRef = this.openDialogService.openDialog();
    if(!this.dialogRefSubscribe){
      this.dialogRefSubscribe = this.openDialogService.newItemAdded$.subscribe((data) =>{
        console.log(data);
      })
    }
  }

  onClearBasket(){
    this.basketService.clearBasket();
  }
  logout(): void {
    this.authService.logout();
  }
  isLoggedInned(){
    let token = this.authService.isLoggedIn();
    this.isLoggedIn = token ? true : false;
  }
  ngDoCheck(): void {
    this.isLoggedInned();
  }
}
