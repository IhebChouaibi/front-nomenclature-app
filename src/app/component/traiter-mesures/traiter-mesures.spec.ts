import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiterMesures } from './traiter-mesures';

describe('TraiterMesures', () => {
  let component: TraiterMesures;
  let fixture: ComponentFixture<TraiterMesures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraiterMesures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraiterMesures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
