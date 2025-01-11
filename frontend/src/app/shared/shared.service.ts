import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterComponent } from './toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  contract_management_global_color = {
    dialog_header: {
      background: '',
      color: '',
    },
    dialog_btn: {
      background: 'linear-gradient(135deg, #F00A 0%, #0F0A 100%)',
      'box-shadow': '-4px 4px 4px rgba(0, 0, 0, 0.25)',
      color: 'red',
    },
    dialog_header_text: {
      color: '#294D7C',
      fontFamaly: '',
      fontSize: '',
    },
    icon_btn: {
      color: '#ffffff',
    },
  };

  constructor(public dialog: MatDialog) {}

  openCustomToastr(
    msg: string,
    status: boolean,
    show_cancel_btn: boolean = false
  ): Promise<any> {
    const dialogRef = this.dialog.open(ToasterComponent, {
      panelClass: 'warning_dialog_not_permitted',
      maxWidth: '100vw',
      maxHeight: '100vh',
      disableClose: true,
      hasBackdrop: true,
      data: {
        reason: msg,
        title1: 'Indian Oil ',
        title2: 'E R P L',
        status: status,
        show_cancel_btn: show_cancel_btn,
      },
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed => ', result);

        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
