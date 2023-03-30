import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';

import { StoreService } from 'src/app/services/store.service';
import { OpenDialogService } from 'src/app/services/opendialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnDestroy {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();
  @Output() removeProduct = new EventEmitter();
  isLoggedInned: boolean;

  dialogRefSubscribe: Subscription | undefined;
  productDeleteSubscribe: Subscription | undefined;
  constructor(private authService: AuthService, private storeService: StoreService, private openDialogService : OpenDialogService) { }

  ngOnInit(): void {
    this.isLoggedInned = this.authService.isLoggedIn();
  }
  onAddToCard():void{
    this.addToCart.emit(this.product);
  }

  onOpenDialog(product: Product): void {
    const dialogRef = this.openDialogService.openDialog(product);

    this.dialogRefSubscribe = dialogRef.afterClosed().subscribe( (data) => {
      this.product = data;
      }
    );
  }


  onDeleteProduct(id: number){
      this.productDeleteSubscribe = this.storeService.deleteProduct(id).subscribe( (data) => {
        this.removeProduct.emit(data);
      })
  }
  ngOnDestroy(): void {
    this.dialogRefSubscribe?.unsubscribe();
    this.productDeleteSubscribe?.unsubscribe();
  }
}
