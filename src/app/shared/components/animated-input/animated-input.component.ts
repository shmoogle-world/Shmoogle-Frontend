import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animated-input',
  templateUrl: './animated-input.component.html',
  styleUrls: ['./animated-input.component.scss']
})
export class AnimatedInputComponent {
  
  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();
  @Input() animationActive: boolean = false;
  
  @Input() inputType: string = 'text';
  @Input() placeholderText: string = '';
  @Input() big: boolean = false;
  
  onChange(e) {
    this.inputModelChange.emit(e);
  }

}
