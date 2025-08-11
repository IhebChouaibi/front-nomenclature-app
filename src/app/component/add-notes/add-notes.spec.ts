import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotes } from './add-notes';

describe('AddNotes', () => {
  let component: AddNotes;
  let fixture: ComponentFixture<AddNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
