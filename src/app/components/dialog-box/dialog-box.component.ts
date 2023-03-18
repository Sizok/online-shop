import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
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
    description: new FormControl(this.data?.details.description ?? ''),
    features: new FormControl(this.data?.details.features ?? ''),
    volume: new FormControl(this.data?.details.volume ?? ''),
    amount: new FormControl(this.data?.details.amount ?? ''),
    affiliation_id: new FormControl(this.data?.details.affiliation_id ?? '')
  });

  isNew: boolean = true;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(){
  this.data = {
    id: this.myForm.value.id,
    title: this.myForm.value.title,
    price: this.myForm.value.price,
    image: 'assets/images/111773440799_OF_F.jpg',
    details:{
      description: this.myForm.value.description,
      features: this.myForm.value.features,
      volume: this.myForm.value.volume,
      amount: this.myForm.value.amount,
      affiliation_id: this.myForm.value.affiliation_id
    }
  }

    this.dialogRef.close(this.data);
  }
  ngOnInit(): void {

  }

}
