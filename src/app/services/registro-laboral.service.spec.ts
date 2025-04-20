import { TestBed } from '@angular/core/testing';

import { RegistroLaboralService } from './registro-laboral.service';

describe('RegistroLaboralService', () => {
  let service: RegistroLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
