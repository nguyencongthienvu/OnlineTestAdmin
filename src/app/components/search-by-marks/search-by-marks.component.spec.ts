import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByMarksComponent } from './search-by-marks.component';

describe('SearchByMarksComponent', () => {
  let component: SearchByMarksComponent;
  let fixture: ComponentFixture<SearchByMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
