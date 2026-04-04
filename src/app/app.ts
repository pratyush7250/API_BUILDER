import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar'; // Adjust paths
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  isCollapsed = false;

  toggleSidebar(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }



}