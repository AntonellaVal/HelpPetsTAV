import { TestBed } from '@angular/core/testing';

import { BdServicioService } from './bd-servicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('BdServicioService', () => {
  let service: BdServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite, BdServicioService]
    });
    service = TestBed.inject(BdServicioService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
