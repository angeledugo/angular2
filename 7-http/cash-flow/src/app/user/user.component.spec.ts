import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { UserServiceMock } from './../shared/testing/UserServiceMock';

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;
  let component: UserComponent;
  let userServiceMock: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
      providers: [
        { provide: UserService, useValue: new UserServiceMock() }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userServiceMock = fixture.debugElement.injector.get(UserService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile() from service', () => {
    spyOn(userServiceMock, 'getProfile').and.callThrough();
    component.ngOnInit();
    expect(userServiceMock.getProfile).toHaveBeenCalled();
  });

  it('should render the user data', () => {
    fixture.detectChanges();
    const user: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(user.textContent).toContain(JSON.stringify('testingUser'));
  });
});
