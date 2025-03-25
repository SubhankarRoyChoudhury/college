import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogCollegeRegistrationComponent } from './college-registration/dialog-college-registration/dialog-college-registration.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserRegistrationComponent } from './user-registration/dialog-user-registration/dialog-user-registration.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor() {}

  ngOnInit(): void {}
}
