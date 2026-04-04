import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzBadgeModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  @Input() isCollapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  handelOnDb() {
    this.router.navigate(['/dashboard']);

  }
  handleOnApi() {
    this.router.navigate(['/api']);

  }
  handleOnTestApi() {
    this.router.navigate(['/test']);
  }
}