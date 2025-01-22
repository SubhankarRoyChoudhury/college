import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeAllLoginUsersListComponent } from './college-all-login-users-list.component';

describe('CollegeAllLoginUsersListComponent', () => {
  let component: CollegeAllLoginUsersListComponent;
  let fixture: ComponentFixture<CollegeAllLoginUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeAllLoginUsersListComponent]
    });
    fixture = TestBed.createComponent(CollegeAllLoginUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
