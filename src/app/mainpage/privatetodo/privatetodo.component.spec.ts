import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatetodoComponent } from './privatetodo.component';

describe('PrivatetodoComponent', () => {
  let component: PrivatetodoComponent;
  let fixture: ComponentFixture<PrivatetodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatetodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivatetodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
