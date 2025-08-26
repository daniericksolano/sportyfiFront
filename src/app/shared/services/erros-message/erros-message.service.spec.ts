import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrosMessageService } from './erros-message.service';

describe('ErrosMessageService', () => {
  let component: ErrosMessageService;
  let fixture: ComponentFixture<ErrosMessageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrosMessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrosMessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
