import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { Controller } from '../../node-templates/controller/controller';
import { Doc } from '../../node-templates/doc/doc';
import { HttpIn } from '../../node-templates/http-in/http-in';
@Component({
  selector: 'app-flow-config-panel',
  imports: [CommonModule, NzIconModule, NzDrawerModule, Controller, Doc, HttpIn],
  templateUrl: './flow-config-panel.html',
  styleUrl: './flow-config-panel.css',
})
export class FlowConfigPanel {
  private _selectedNode: any;


  @Input()
  set selectedNode(node: any) {
    this._selectedNode = node;
    if (node) {
      this.open(); // Automatically open when a node is assigned
    }
  }

  get selectedNode(): any {
    return this._selectedNode;
  }



  //MODAL CONTROL
  widthMap: any = {
    'HTTP-IN': 500,
    'HTTP-RESPONSE': 500,
    'CONTROLLER': 800,
    'DOC': 700,
    'CONFIG': 800,
    'MIDDLEWARE': 800
  };

  getDrawerWidth(): number {
    return this.widthMap[this.selectedNode?.type] || 500;
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this._selectedNode = null; // Optional: clear selection on close
  }



}
