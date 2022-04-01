import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { EventService } from './event.service';

import { SubAreaService } from './sub-area.service';
import { ToastService } from './toast.service';

describe('SubAreaService', () => {
  let service: SubAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, DataService, EventService, ToastService],
    });
    service = TestBed.inject(SubAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});