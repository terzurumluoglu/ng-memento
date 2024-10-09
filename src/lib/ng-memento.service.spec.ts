import { TestBed } from '@angular/core/testing';

import { NgMementoService } from './ng-memento.service';

describe('NgMementoService', () => {
  let service: NgMementoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMementoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
