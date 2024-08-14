import { TestBed } from '@angular/core/testing';

import { NotificationSoundService } from './notification-sound.service';

describe('NotificationSoundService', () => {
  let service: NotificationSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
