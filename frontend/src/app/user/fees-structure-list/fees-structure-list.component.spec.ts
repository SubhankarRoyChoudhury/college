import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesStructureListComponent } from './fees-structure-list.component';

describe('FeesStructureListComponent', () => {
  let component: FeesStructureListComponent;
  let fixture: ComponentFixture<FeesStructureListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeesStructureListComponent]
    });
    fixture = TestBed.createComponent(FeesStructureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
