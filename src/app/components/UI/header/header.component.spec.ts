import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadrerComponent } from './header.component';

describe('HeadrerComponent', () => {
  let component: HeadrerComponent;
  let fixture: ComponentFixture<HeadrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
