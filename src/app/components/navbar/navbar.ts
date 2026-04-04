import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    NzIconModule, 
    NzBadgeModule, 
    NzAvatarModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {}