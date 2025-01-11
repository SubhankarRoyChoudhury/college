import { Injectable } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apiToasterSharedService: SharedService) {}

  async openToaster(
    msg: string,
    status: boolean,
    show_cancel_btn: boolean = false
  ): Promise<any> {
    return await this.apiToasterSharedService
      .openCustomToastr(msg, status, show_cancel_btn)
      .then((response) => {
        // Handle the response here
        console.log('Dialog response:', response);
        return response;
      })
      .catch((error) => {
        // Handle errors or cancelations
        console.error('Dialog error:', error);
        return false;
      });
  }
}
