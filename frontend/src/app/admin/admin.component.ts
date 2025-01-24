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
  title: string = 'Admin Dashboard';
  showAddUserButton: boolean = false;
  showAddCollegeButton: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     const routeData = this.route.firstChild?.snapshot.data;
    //     this.title = routeData?.['title'];
    //   });

    // // Set title on initial load
    // const initialRouteData = this.route.firstChild?.snapshot.data;
    // this.title = initialRouteData?.['title'];

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeData = this.route.firstChild?.snapshot.data;
        const currentRoute = this.route.firstChild?.snapshot.url[0]?.path;

        // Update title
        this.title = routeData?.['title'] || 'Admin Dashboard';

        // Determine which button to show
        this.showAddUserButton = currentRoute === 'user-registration';
        this.showAddCollegeButton = currentRoute === 'college-registration';
      });

    // Set title and button state on initial load
    const initialRouteData = this.route.firstChild?.snapshot.data;
    const initialRoute = this.route.firstChild?.snapshot.url[0]?.path;

    this.title = initialRouteData?.['title'] || 'Admin Dashboard';
    this.showAddUserButton = initialRoute === 'user-registration';
    this.showAddCollegeButton = initialRoute === 'college-registration';
  }

  openAddUser() {
    console.log('Add User from here');
    const dialogRef = this.dialog.open(DialogUserRegistrationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelClass_clg_register',
      data: {
        title: 'College User Registration Form',
        btn_title: 'Submit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openAddCollege() {
    console.log('Add College from here');
    const dialogRef = this.dialog.open(DialogCollegeRegistrationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelClass_clg_register',
      data: {
        title: 'College Registration Form',
        btn_title: 'Submit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
