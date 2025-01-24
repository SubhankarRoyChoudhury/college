import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeRegistrationComponent } from './college-registration.component';

describe('CollegeRegistrationComponent', () => {
  let component: CollegeRegistrationComponent;
  let fixture: ComponentFixture<CollegeRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeRegistrationComponent]
    });
    fixture = TestBed.createComponent(CollegeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
