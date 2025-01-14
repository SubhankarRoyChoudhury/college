import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormCollegeUserComponent } from './registration-form-college-user.component';

describe('RegistrationFormCollegeUserComponent', () => {
  let component: RegistrationFormCollegeUserComponent;
  let fixture: ComponentFixture<RegistrationFormCollegeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFormCollegeUserComponent]
    });
    fixture = TestBed.createComponent(RegistrationFormCollegeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
