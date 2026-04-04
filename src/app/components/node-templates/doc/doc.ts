import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import Quill from 'quill';

// ✅ FIX: cast to ANY (important)
const SizeStyle: any = Quill.import('attributors/style/size');

SizeStyle.whitelist = [
  '12px', '14px', '16px', '18px', '20px', '24px', '32px'
];

Quill.register(SizeStyle, true);

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    QuillModule
  ],
  templateUrl: './doc.html',
  styleUrls: ['./doc.css']
})
export class Doc implements OnInit {

  content: string = '';

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],

      [{ header: [1, 2, 3, 4, false] }],

      // ✅ NUMERIC FONT SIZE
      [{ size: [
        '12px', '14px', '16px', '18px', '20px', '24px', '32px'
      ] }],

      [{ color: [] }, { background: [] }],

      [{ align: [] }],

      [{ list: 'ordered' }, { list: 'bullet' }],

      ['link', 'image']
    ]
  };

  ngOnInit() {
    this.loadContent();
  }

  saveContent() {
    localStorage.setItem('doc-content', this.content);
    console.log("The content is :", this.content);
  }

  loadContent() {
    this.content = localStorage.getItem('doc-content') || '';
  }

  clearContent() {
    this.content = '';
  }

  getCharCount(): number {
    return this.content
      ? this.content.replace(/<[^>]*>/g, '').length
      : 0;
  }
}