import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// NG-ZORRO Imports
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

interface Column {
  name: string;
  schema: string;
  type: 'String' | 'Number' | 'Boolean' | 'Object' | 'Decimal' | 'Image';
  required: boolean;
  defaultValue?: any;
  min?: number;
  max?: number;
}

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NzTableModule, NzButtonModule,
    NzModalModule, NzFormModule, NzInputModule, NzSelectModule, NzCheckboxModule,
    NzInputNumberModule, NzImageModule, NzPopoverModule, NzIconModule,
    NzUploadModule, NzRadioModule, NzDividerModule, NzGridModule,NzPaginationModule
  ],
  templateUrl: './dynamic-table.html',
  styleUrls: ['./dynamic-table.css']
})
export class DynamicTable implements OnInit {
  isVisible = false;
  isEditMode = false;
  validateForm!: FormGroup;
  editingSchemaName: string | null = null;
  imageSource: 'url' | 'local' = 'url';

  columns: Column[] = [
    { name: 'id', schema: 'id', type: 'String', required: true },
  ];

  listOfData: any[] = [];

@Input() tableName: string = ''; 

  // Optional: If you want to run code every time the table changes
  ngOnChanges() {
    console.log('Fetching data for:', this.tableName);
    // Call your API or filter logic here
  }

  constructor(private fb: FormBuilder, private modal: NzModalService) {
    this.initForm();
  }

  ngOnInit(): void {
    // Auto-generate slug for schema name
    this.validateForm.get('columnName')?.valueChanges.subscribe(val => {
      if (!this.isEditMode && val) {
        const slug = val.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '_');
        this.validateForm.get('schemaName')?.setValue(slug);
      }
    });

    // Clear default value if required is checked
    this.validateForm.get('isRequired')?.valueChanges.subscribe(required => {
      if (required) {
        this.validateForm.get('defaultValue')?.setValue(null);
      }
    });
  }

  initForm() {
    this.validateForm = this.fb.group({
      columnName: [null, [Validators.required]],
      schemaName: [{ value: null, disabled: true }, [Validators.required]],
      dataType: ['String', [Validators.required]],
      isRequired: [false],
      defaultValue: [null],
      min: [null],
      max: [null]
    });
  }

  showModal(col?: Column): void {
    if (col) {
      this.isEditMode = true;
      this.editingSchemaName = col.schema;
      this.validateForm.patchValue({
        columnName: col.name,
        schemaName: col.schema,
        dataType: col.type,
        isRequired: col.required,
        defaultValue: col.defaultValue,
        min: col.min,
        max: col.max
      });
      this.imageSource = (col.type === 'Image' && col.defaultValue?.startsWith('data:image')) ? 'local' : 'url';
    } else {
      this.isEditMode = false;
      this.editingSchemaName = null;
      this.validateForm.reset({ dataType: 'String', isRequired: false });
    }
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm.reset({ dataType: 'String', isRequired: false });
  }

  handleUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      this.validateForm.get('defaultValue')?.setValue(reader.result);
    };
    return false;
  };

  saveColumn(): void {
    if (this.validateForm.valid || this.isEditMode) {
      const formVal = this.validateForm.getRawValue();
      const newCol: Column = {
        name: formVal.columnName,
        schema: formVal.schemaName,
        type: formVal.dataType,
        required: formVal.isRequired,
        defaultValue: formVal.isRequired ? null : formVal.defaultValue, // Ensure null if required
        min: formVal.min,
        max: formVal.max
      };

      if (this.isEditMode) {
        this.columns = this.columns.map(c => c.schema === this.editingSchemaName ? newCol : c);
      } else {
        this.columns = [...this.columns, newCol];
        this.listOfData = this.listOfData.map(item => ({
          ...item,
          [newCol.schema]: newCol.defaultValue ?? (newCol.type === 'Boolean' ? false : null)
        }));
      }
      console.log('Current Table Schema:', this.columns);
      this.handleCancel();
    }
  }

  confirmDelete(schema: string): void {
    this.modal.confirm({
      nzTitle: 'Delete Column',
      nzContent: `<b style="color: red;">Are you sure?</b>`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => { this.columns = this.columns.filter(c => c.schema !== schema); }
    });
  }
}