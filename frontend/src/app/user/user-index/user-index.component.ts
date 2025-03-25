import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss'],
})
export class UserIndexComponent {
  @ViewChild('drawer') public drawer!: MatDrawer;

  mode: MatDrawerMode = 'side';
  sidebar_opened: boolean = true;
  constructor(private AppService: AppService) {}

  ngOnInit(): void {
    this.AppService.sideNavToggleSubject.subscribe(() => {
      this.drawer?.toggle();
    });

    if (window.innerWidth < 800) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 800) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
  }
}
