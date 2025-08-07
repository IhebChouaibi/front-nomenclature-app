import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNomenclature } from './add-nomenclature';

describe('AddNomenclature', () => {
  let component: AddNomenclature;
  let fixture: ComponentFixture<AddNomenclature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNomenclature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNomenclature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
