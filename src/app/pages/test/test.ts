import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NG-ZORRO Imports
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';

interface ApiRequest {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  isEditing: boolean;
}

interface Collection {
  id: string;
  name: string;
  isExpanded: boolean;
  isEditing: boolean;
  requests: ApiRequest[];
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NzIconModule,
    NzButtonModule, NzInputModule, NzTableModule, NzTabsModule,
    NzSelectModule, NzPopoverModule, NzModalModule, NzDropDownModule,NzRadioModule,NzSplitterModule
  ],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class Test {
  collections: Collection[] = [
    {
      id: '1',
      name: 'Collection-01',
      isExpanded: true,
      isEditing: false,
      requests: [{ id: 'r1', name: 'create_product', method: 'GET', isEditing: false }]
    }
  ];

  selectedRequest: ApiRequest | null = null;
  selectedCollection: Collection | null = null;
  queryParams = [{ key: '', value: '' }, { key: '', value: '' }];
  bodyType: string = 'form';
  bodyRawContent: string = '';

  // Auth Tab State
  authType: string = 'bearer';
  bearerToken: string = '';

  //log state
  logContent: string ="{\n \"message\": \"This is a sample log output.\"\n}";

  constructor(private modal: NzModalService) { }

  addCollection() {
    const newCol: Collection = {
      id: Date.now().toString(),
      name: 'New Collection',
      isExpanded: true,
      isEditing: true,
      requests: []
    };
    this.collections = [newCol, ...this.collections];
  }

  addRequest(col: Collection, event?: MouseEvent) {
    if (event) event.stopPropagation(); // Prevent toggling the folder
    const newReq: ApiRequest = {
      id: Date.now().toString(),
      name: 'New Request',
      method: 'GET',
      isEditing: true
    };
    col.requests.push(newReq);
    col.isExpanded = true;
    this.selectRequest(col, newReq);
  }

  deleteCollection(id: string) {
    this.modal.confirm({
      nzTitle: 'Delete Collection?',
      nzContent: 'This will delete all requests inside this collection.',
      nzOkDanger: true,
      nzOnOk: () => this.collections = this.collections.filter(c => c.id !== id)
    });
  }

  deleteRequest(col: Collection, reqId: string) {
    col.requests = col.requests.filter(r => r.id !== reqId);
    if (this.selectedRequest?.id === reqId) {
      this.selectedRequest = null;
    }
  }

  selectRequest(col: Collection, req: ApiRequest) {
    this.selectedCollection = col;
    this.selectedRequest = req;
  }
}