import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMementoComponent } from './ng-memento.component';

describe('NgMementoComponent', () => {
  let component: NgMementoComponent;
  let fixture: ComponentFixture<NgMementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMementoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgMementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
