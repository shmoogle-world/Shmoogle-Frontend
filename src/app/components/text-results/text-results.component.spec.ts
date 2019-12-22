import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextResultsComponent } from './text-results.component';

describe('TextResultsComponent', () => {
  let component: TextResultsComponent;
  let fixture: ComponentFixture<TextResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
