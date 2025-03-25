import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserIndexService {
  global_navbar_menu = {
    menu: {
      background: 'linear-gradient(135deg, #F00A 0%, #0F0A 100%)',
      hover: 'red',
    },
    icon_and_font: {
      color: '#fff',
    },
  };

  confirmation_dialog_style = {
    btn: {
      background: 'linear-gradient(135deg, #F00A 0%, #0F0A 100%)',
      'box-shadow': '-4px 4px 4px rgba(0, 0, 0, 0.25)',
      color: 'red',
    },
    text: {
      color: '#5C787A',
      fontFamaly: '',
      fontSize: '',
    },
  };

  constructor() {}
}
