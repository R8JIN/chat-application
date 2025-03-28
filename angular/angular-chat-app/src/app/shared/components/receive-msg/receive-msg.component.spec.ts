import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveMsgComponent } from './receive-msg.component';

describe('ReceiveMsgComponent', () => {
  let component: ReceiveMsgComponent;
  let fixture: ComponentFixture<ReceiveMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveMsgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiveMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
