import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animated-input',
  templateUrl: './animated-input.component.html',
  styleUrls: ['./animated-input.component.scss']
})
export class AnimatedInputComponent implements OnInit {
  
  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();
  @Input() animationActive: boolean = false;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  onChange(e) {
    this.inputModelChange.emit(e);
  }

}
