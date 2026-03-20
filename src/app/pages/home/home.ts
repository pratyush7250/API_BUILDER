import { Component } from '@angular/core';

import { FlowEditor } from '../flow-editor/flow-editor';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FlowEditor 
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  

}