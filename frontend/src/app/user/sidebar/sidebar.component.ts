import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed: boolean = false; // Sidebar starts expanded

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Toggle state
  }
}
