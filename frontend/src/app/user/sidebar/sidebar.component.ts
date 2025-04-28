import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed: boolean = false; // Sidebar starts expanded
  isCollapsedMenu: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.determineMenuState();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.determineMenuState());
  }
  // Activate Route Path To Expanded The Expansional Panel Start
  private determineMenuState(): void {
    const activeRoutes = [
      '/reports/pending-fees-report',
      '/reports/collection-fees-report',
    ];
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl); // Debug current URL
    this.isCollapsedMenu = !activeRoutes.includes(currentUrl);
    console.log('Is Collapsed Menu:', this.isCollapsedMenu); // Debug menu state
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Toggle state
  }
  isReportMenuVisible = false; // Tracks the visibility of the report submenu

  // Toggles the visibility of the report submenu
  toggleReportMenu() {
    this.isReportMenuVisible = !this.isReportMenuVisible;
  }
}
