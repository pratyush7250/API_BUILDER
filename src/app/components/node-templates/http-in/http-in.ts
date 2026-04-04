import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// NG-ZORRO Imports
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-http-in',
  standalone: true, // Assuming you are using Standalone components based on the error
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzRadioModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './http-in.html',
  styleUrls: ['./http-in.css']
})
export class HttpIn implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      method: ['GET'],
      route: ['/api'],
      requestType: ['params'], 
      parameters: this.fb.array([
        this.fb.group({ checked: [true], key: ['messageId'] }),
        this.fb.group({ checked: [false], key: [''] })
      ])
    });
  }

  get parameters(): FormArray {
    return this.validateForm.get('parameters') as FormArray;
  }

  addParameter(): void {
    this.parameters.push(
      this.fb.group({ checked: [false], key: [''] })
    );
  }

  get showParams(): boolean {
    return this.validateForm.get('requestType')?.value === 'params';
  }
}