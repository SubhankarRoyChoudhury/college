import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  title: string = 'Admin Dashboard';
  showAddUserButton: boolean = false;
  showAddCollegeButton: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
  }
  openAddCollege() {
    console.log('Add College from here');
  }
}
