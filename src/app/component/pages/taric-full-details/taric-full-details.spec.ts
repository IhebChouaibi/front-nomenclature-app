import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaricFullDetails } from './taric-full-details';

describe('TaricFullDetails', () => {
  let component: TaricFullDetails;
  let fixture: ComponentFixture<TaricFullDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaricFullDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaricFullDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
