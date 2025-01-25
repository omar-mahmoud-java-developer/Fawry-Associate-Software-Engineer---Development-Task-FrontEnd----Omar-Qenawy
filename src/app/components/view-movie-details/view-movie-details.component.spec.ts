import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMovieDetailsComponent } from './view-movie-details.component';

describe('ViewMovieDetailsComponent', () => {
  let component: ViewMovieDetailsComponent;
  let fixture: ComponentFixture<ViewMovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMovieDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
