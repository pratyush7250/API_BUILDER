import { Component } from '@angular/core';
import { DynamicTable } from '../../components/dynamic-table/dynamic-table';
import { CommonModule } from '@angular/common'; // Required for @for and @if
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-home',
  imports: [DynamicTable,CommonModule,NzIconModule,NzDividerModule],
  templateUrl: './database.html',
  styleUrl: './database.css',
})
export class Database {
// List of tables matching your screenshot
  tables: string[] = ['user', 'products', 'cart', 'orders'];
  
  // Property to hold the currently selected table
  selectedTable: string = 'user'; // Default selection

  selectTable(tableName: string) {
    this.selectedTable = tableName;
  }
  addTable(){
    
  }
}
