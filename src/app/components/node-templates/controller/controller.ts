import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
@Component({
  selector: 'app-controller',
  imports: [FormsModule, MonacoEditorModule],
  templateUrl: './controller.html',
  styleUrl: './controller.css',
})
export class Controller {
// code editor section
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
    minimap: { enabled: true },
  };

  code: string = `function hello() {
  console.log("Hello World");
}`;
}
