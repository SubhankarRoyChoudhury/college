import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent {
  constructor(
    public dialogRef: MatDialogRef<ToasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.status) {
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 2500);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  okBtn(): void {
    this.dialogRef.close(true);
  }
}
