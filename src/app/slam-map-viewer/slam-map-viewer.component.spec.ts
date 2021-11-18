import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlamMapViewerComponent } from './slam-map-viewer.component';

describe('SlamMapViewerComponent', () => {
  let component: SlamMapViewerComponent;
  let fixture: ComponentFixture<SlamMapViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlamMapViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlamMapViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
