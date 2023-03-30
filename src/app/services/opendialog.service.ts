import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../components//dialog-box/dialog-box.component';
import { Product } from '../models/product.model';
import { StoreService } from './store.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {
  dialogConfig: MatDialogConfig = {
    width: '500px',
    disableClose: true
  }
  dialogRef?: MatDialogRef<DialogBoxComponent>;
  private newItemAddedSource = new Subject<Product>();
  newItemAdded$ = this.newItemAddedSource.asObservable();
  constructor(public dialog: MatDialog, public storeService: StoreService) { }

  openDialog(product?: Product): MatDialogRef<DialogBoxComponent>{
    this.dialogConfig.data = product;
    this.dialogRef = this.dialog.open(DialogBoxComponent, this.dialogConfig);
    this.dialogRef.afterClosed().subscribe(
      (data) => {
        if(data && data.id){
          return this.storeService.updateProduct(data).subscribe((data) => {
            this.newItemAddedSource.next(data);
          })
        }else if (data) {
          return this.storeService.addProduct(data).subscribe((data) => {
            this.newItemAddedSource.next(data);
          })
        }else{
          return new Error('Сталася помилка, в функції');
        }
      }
    );
    return this.dialogRef;
  }
}
