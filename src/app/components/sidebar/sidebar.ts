import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Required for router-outlet
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzBadgeModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  isCollapsed = false;

  constructor(private router: Router) { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  handelOnDb() {
    this.router.navigate(['/dashboard/database']);
  }

  handleOnApi() {
    this.router.navigate(['/dashboard/api']);
  }

  handleOnTestApi() {
    this.router.navigate(['/dashboard/test']);
  }
}