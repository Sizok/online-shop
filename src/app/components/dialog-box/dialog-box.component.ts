import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
    isNew: boolean = true;
    constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(this.data) this.isNew = false;
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    image: new FormControl(this.data?.image ?? 'https://i.pravatar.cc'),
    description: new FormControl(this.data?.description ?? ''),
    category: new FormControl(this.data?.category ?? ''),
  });


  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(){
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: this.myForm.value.image,
      description: this.myForm.value.description,
      category: this.myForm.value.category
      }
    if (!this.data.id){
      delete this.data.id;
    }
    this.dialogRef.close(this.data);
  }
  ngOnInit(): void {
  }

}
