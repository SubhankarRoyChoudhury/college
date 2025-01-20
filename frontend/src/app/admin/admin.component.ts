import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private AppService: AppService) {}

  ngOnInit(): void {
    this.getColleges();
  }

  getColleges(): void {
    this.AppService.getColleges().subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        this.AppService.openToaster('Data Not Found', false);
      }
    );
  }
}
