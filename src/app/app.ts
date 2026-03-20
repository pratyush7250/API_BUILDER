import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlowEditor } from './pages/flow-editor/flow-editor';
@Component({
  selector: 'app-root',
  imports: [RouterModule, FlowEditor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
