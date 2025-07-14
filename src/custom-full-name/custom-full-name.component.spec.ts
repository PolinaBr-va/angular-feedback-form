import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFullNameComponent } from './custom-full-name.component';

describe('CustomFullNameComponent', () => {
  let component: CustomFullNameComponent;
  let fixture: ComponentFixture<CustomFullNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFullNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFullNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
