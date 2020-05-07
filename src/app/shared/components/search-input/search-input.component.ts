import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();
  @Input() animationActive: boolean;
  @Output() search = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }
  emitSearch(e) {
    this.search.emit(e);
  }
  inputModelOnChange(e) {
    this.inputModelChange.emit(e);
  }
 }
