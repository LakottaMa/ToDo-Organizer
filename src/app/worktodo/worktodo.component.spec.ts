import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktodoComponent } from './worktodo.component';

describe('WorktodoComponent', () => {
  let component: WorktodoComponent;
  let fixture: ComponentFixture<WorktodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorktodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorktodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
