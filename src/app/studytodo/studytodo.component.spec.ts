import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudytodoComponent } from './studytodo.component';

describe('StudytodoComponent', () => {
  let component: StudytodoComponent;
  let fixture: ComponentFixture<StudytodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudytodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudytodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
